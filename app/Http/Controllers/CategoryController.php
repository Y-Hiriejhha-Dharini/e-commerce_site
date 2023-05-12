<?php

namespace App\Http\Controllers;

use App\Models\category;
use App\Models\MaterialStore;
use App\Models\Product;
use App\Models\Showroom;
use App\Models\ShowroomCloth;
use App\Models\TailorShop;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function category(category $category)
    {
        if($category->id == 1)
        {
            return TailorShop::all();
        }elseif($category->id == 2)
        {
            return Product::all();
        }elseif($category->id == 3)
        {
            return Showroom::all();
        }
    }

    public function customCloth($id)
    {
        return TailorShop::find($id);
    }

    public function materials()
    {
        return MaterialStore::all();
    }

    public function showrooms()
    {
        return Showroom::all();
    }

    public function singleShowroom(Showroom $showroom)
    {
        return Showroom::with('showroom_cloth')->where('id',$showroom->id)->get();
    }

    public function delete(Showroom $showroom)
    {
        $showroom->delete();

        return ['Showroom successfullt deleted'];
    }

    public function getProducts($id)
    {
        return ShowroomCloth::find($id);
    }
}
