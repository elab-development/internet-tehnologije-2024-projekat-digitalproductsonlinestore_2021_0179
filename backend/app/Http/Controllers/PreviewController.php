<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Smalot\PdfParser\Parser;

class PreviewController extends Controller
{
    public function preview($filename)
    {
        $filePath = storage_path("app/public/files/{$filename}");

        if (!file_exists($filePath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        try {
            $parser = new Parser();
            $pdf = $parser->parseFile($filePath);
            $text = $pdf->getText();

            // Vrati prvih 500 karaktera kao preview
            $preview = mb_substr($text, 0, 500);

            return response()->json([
                'preview' => $preview
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error parsing PDF'], 500);
        }
    }
}
