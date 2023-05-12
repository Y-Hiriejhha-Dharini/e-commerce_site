<?php

namespace App\Http\Controllers;

use App\Models\MaterialStore;
use App\Models\Product_price;
use App\Models\Showroom;
use App\Models\TailorShop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartmentController extends Controller
{
    public function add_department()
    {
        // return [request()->all()];

        DB::beginTransaction();
        try{
            request()->validate([
                'name' => 'required',
                'file_path' => 'required',
                'description' => 'required',
                'category' => 'required'
            ]);

                if(request()->category == 1)
                {
                    $tailor = new TailorShop();
                    $tailor->name = request()->name;
                    $tailor->file_path = request()->file('file_path')->store('products');
                    $tailor->description = request()->description;
                    $tailor->status = 0;
                    $tailor->save();

                }elseif(request()->category == 2)
                {
                    $showroom = new Showroom();
                    $showroom->name = request()->name;
                    $showroom->file_path = request()->file('file_path')->store('products');
                    $showroom->description = request()->description;
                    $showroom->status = 0;
                    $showroom->save();
                }elseif(request()->category == 3)
                {
                    $materialStore = new MaterialStore();
                    $materialStore->name = request()->name;
                    $materialStore->file_path = request()->file('file_path')->store('products');
                    $materialStore->description = request()->description;
                    $materialStore->status = 0;
                    $materialStore->save();
                }

            DB::commit();
            return ['Data Saved Successfully'];

        }catch(\Exception $e)
        {
            DB::rollBack();
            return ['Data not saved'];
        }
    }

    public function single_material(MaterialStore $MaterialStore)
    {
        return $MaterialStore;
    }
}
