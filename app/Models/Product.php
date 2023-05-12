<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function product_price()
    {
        return $this->hasMany(Product_price::class,'product_id');
    }

    public function category()
    {
        return $this->belongsTo(category::class);
    }

    public function getNameAttribute($value)
    {
        return strtoupper($value);
    }

    // public function scopeFilter($query, array $filters)
    // {
    //         $query->when($filters['search'] ?? false, fn($query, $search)=>
    //         $query->where(fn($query)=>
    //             $query->where('name','like','%'.$search.'%')
    //                     ->orWhere('description','like','%'.$search.'%')
    //         )
    //     );

    //     $query->when($filters['category'] ?? false, function($query, $categories){
    //         $query
    //             ->whereHas('category', fn($query) =>
    //                 $query->where('name',$categories)
    //             );
    //     });
    // }
}
