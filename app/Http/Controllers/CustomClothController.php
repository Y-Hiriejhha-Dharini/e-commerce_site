<?php

namespace App\Http\Controllers;

use App\Models\CustomCloth;
use Illuminate\Http\Request;

class CustomClothController extends Controller
{
    public function add()
    {
        request()->validate([
            'cus_id' => 'required',
            'size' => 'required',
            'price' => 'required',
            'mat_id' => 'required',
        ]);

        CustomCloth::create([
            'cus_id' => request()->cus_id,
            'size' => request()->size,
            'price' => request()->price,
            'mat_id' => request()->mat_id,
            'status' => 0
        ]);

        return ['Data Successfully Saved'];
    }
}
