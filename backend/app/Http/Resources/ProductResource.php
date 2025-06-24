<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'product';
    public function toArray(Request $request): array
    {
        //  return parent::toArray($request);
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'description' => $this->resource->description,
            'price' => $this->resource->price,
            'category_id' => $this->resource->category_id,
            'file_path' => $this->resource->file_path,
            'image_url' => $this->resource->image_url,
            'preview_url' => $this->getPreviewUrl(),
            'category' => $this->resource->category ? [
                'id' => $this->resource->category->id,
                'name' => $this->resource->category->name
            ] : null,
        ];
    }
    public function getPreviewUrl()
    {
        $category = strtolower($this->category->name);

        switch ($category) {
            case 'digital art':
                return $this->preview_path
                    ? asset($this->preview_path)
                    : null;
            case 'audio books':
                return $this->preview_path
                    ? asset($this->preview_path)
                    : null;
            case 'audio files':
                return $this->preview_path
                    ? asset($this->preview_path)
                    : null;
            case 'video content':
                return $this->preview_path
                    ? asset($this->preview_path)
                    : null;
            case 'templates':
            case 'fonts':
            case 'web assets':
                return $this->preview_path
                    ? asset($this->preview_path)
                    : null;
            default:
                return null;
        }
    }
}
