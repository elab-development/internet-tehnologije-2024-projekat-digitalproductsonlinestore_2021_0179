<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('name')) {
            $query->where('name', 'LIKE', '%' . $request->input('name') . '%');
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->input('min_price'));
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->input('max_price'));
        }

        if ($request->has('sort_price')) {
            $sortOrder = $request->input('sort_price') === 'desc' ? 'desc' : 'asc';
            $query->orderBy('price', $sortOrder);
        }

        $products = $query->get();
        return new ProductCollection($products);
    }

    public function store(Request $request)
    {

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden: Only admins can create products'], 403);
        }

        // Validate request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'exists:categories,id',
        ]);

        $product = Product::create($validated);
        return new ProductResource($product);
    }

    public function show($id)
    {

        $product = Product::findOrFail($id);

        // if (!$product) {
        //     return response()->json(['message' => 'Product not found'], 404);
        // }

        return new ProductResource($product);
    }

    public function update(Request $request,  $id)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden: Only admins can update products'], 403);
        }
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric|min:0',
            'category_id' => 'exists:categories,id',
        ]);

        $product->update($validated);
        return response()->json(new ProductResource($product->fresh()), 200);
    }

    public function destroy($id)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden: Only admins can delete products'], 403);
        }
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    public function search(Request $request)
    {
        $query = $request->input('query'); // Dobijanje ključne reči iz zahteva

        $products = Product::where('name', 'LIKE', '%' . $query . '%')->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found'], 404);
        }

        return ProductResource::collection($products);
    }

    public function preview($id)
    {
        $product = Product::findOrFail($id);

        // Primer za PDF preview
        if (str_ends_with($product->file_path, '.pdf')) {
            return response()->file(storage_path("app/public/previews/preview_" . $product->file_path));
        }

        // Primer za sliku sa watermarkom
        if (str_starts_with($product->file_path, 'images/')) {
            return response()->file(storage_path("app/public/watermarks/" . $product->file_path));
        }

        return response()->json(['message' => 'Preview not available.'], 404);
    }

    public function download($id)
    {
        $user = Auth::user();
        $product = Product::findOrFail($id);

        // Dodaj 'files/' ako nije uključeno
        $relativePath = str_starts_with($product->file_path, 'files/')
            ? $product->file_path
            : 'files/' . $product->file_path;

        $filePath = storage_path("app/public/" . $relativePath);

        if (!file_exists($filePath)) {
            return response()->json(['message' => 'File not found on server'], 404);
        }

        // Provera da li je korisnik kupio proizvod
        $hasPurchased = $user->orders()
            ->whereHas('products', fn($q) => $q->where('products.id', $product->id))
            ->exists();

        if (!$hasPurchased) {
            return response()->json(['message' => 'Unauthorized – product not purchased'], 403);
        }

        // Dobavi mime type i ekstenziju
        $mimeType = mime_content_type($filePath);
        $extension = pathinfo($filePath, PATHINFO_EXTENSION);

        // Napravi bezbedan naziv fajla
        $safeName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $product->name) . '.' . $extension;

        // Streamuj fajl sa MIME tipom
        return response()->streamDownload(function () use ($filePath) {
            readfile($filePath);
        }, $safeName, [
            'Content-Type' => $mimeType,
        ]);
    }
}
