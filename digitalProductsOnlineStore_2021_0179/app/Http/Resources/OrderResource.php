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
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        return [
            'id' => $this->id,
            'user' => new UserResource($this->resource->user),
            'total_price' => $this->total_price,
            'status' => $this->status,
            'products' => new ProductCollection($this->products),
        ];
    }
}
