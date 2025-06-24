<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'order';
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);


        return [
            'id' => $this->id,
            'status' => $this->status,
            'notes' => $this->notes,
            'file_path' => $this->file_path,
            
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
            ],
            'products' => $this->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $product->pivot->quantity,
                    'file_path' => $product->file_path,
                    'preview_url' => asset('storage/previews/' . $product->preview_path),
                ];
            }),
            'total_price' => $this->total_price,
            'created_at' => $this->created_at,

        ];
    }
}
