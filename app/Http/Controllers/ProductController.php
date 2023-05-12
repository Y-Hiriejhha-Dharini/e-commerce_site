<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\MaterialStore;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Product_price;
use App\Models\Showroom;
use App\Models\TailorShop;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\MockObject\Stub\ReturnCallback;

class ProductController extends Controller
{
    public function addProduct()
    {
        // return [request()->all()];
        DB::beginTransaction();
        try{
            request()->validate([
                'name' => 'required',
                'file_path' => 'required',
                'description' => 'required',
                'price' => 'required',
                'size' => 'required',
            ]);

                $product = Product::create([
                    'name' => request()->name,
                    'file_path' => request()->file('file_path')->store('products'),
                    'description' => request()->description,
                    'status' => 0,
                ]);    
           return ['hi'];
            $product_price = Product_price::create([
                'product_id' => $product->id,
                'price' => request()->price,
                'size' => request()->size,
            ]);

            DB::commit();
            return ['Data Saved Successfully'];

        }catch(\Exception $e)
        {
            DB::rollBack();
            return ['Data not saved'];
        }
    }

    public function list()
    {
        return Product::with('product_price')->where('status',0)->get();
    }

    public function product(Product $product)
    {
        return Product::join('product_prices','product_prices.product_id', 'products.id')
                        ->where('product_prices.product_id',$product->id)
                        ->get();
                        // return $product->with('product_price')->get();

    }

    public function delete(Product $product)
    {
        if($product)
        {
            $product->delete();
            return ["result" => "Product deleted successfully"];
        }else{
            return ["result" => "Couldn't find the product"];
        }

    }

    public function edit(Product $product)
    {
        $product_price = Product::with('product_price')
                            ->where('products.id',$product->id)
                            ->first();
        return $product_price;
        // return [ 
        //          "id" => $product_price->id,
        //          "product_id" => $product_price->product_id,
        //          "price" =>  $product_price->price,
        //          "size" =>  $product_price->size ,
        //          "created_at" =>  $product_price->created_at ,
        //          "updated_at" =>  $product_price->updated_at ,
        //          "name" =>  $product_price->name ,
        //          "file_path" =>  $product_price->file_path ,
        //          "description" =>  $product_price->description ,
        //          "status" => $product_price->status
        //     ];
    }

    public function update(Product $products)
    {
        DB::beginTransaction();
        try{
            if(request() != "")
            {
                $products->update([
                    'name' => request()->name,
                    'file_path' => request()->file_path,
                    'description' => request()->description
                ]);

                // Product_price::where('product_id',$products->id)
                //     ->update([
                //         'size' => request()->size,
                //         'price' => request()->price
                //         ]);
    
                DB::commit();
                return ['Data saved successfully'];
            }
        }catch(\Exception $e)
        {
            DB::rollBack();
            return ['Data not saved'];
        }
        
    }

    public function toCart(Request $request)
    {
        request()->validate([
            'user' => 'required',
            'product' => 'required',
        ]);
        $user =  json_decode($request['user'], true);
        $product = $request->product;
        $price = Product_price::with('product')
                ->where('product_id',$request->product[0]['product_id'])
                ->where('id',$request->product[0]['id'])
                ->first();

        Cart::create([
            'user_id' => $user['id'],
            'product_id' => $product[0]['product_id'],
            'date' => date('Y-m-d'),
            'status' => '0',
            'amount' => str_replace('Rs. ','', $price['price']),
        ]);

        return response()->json([
            'result' => true,
            'data' => 'data successfully saved in Cart table'
        ]);
    }
    public function cart(User $user)
    {
        // $cart_data =  DB::table('carts AS c')
        //             ->join('products AS p','p.id','c.product_id')
        //             ->where('user_id',$user->getKey())
        //             ->distinct()
        //             ->select(
        //                 'c.user_id',
        //                 'c.product_id',
        //                 'p.name',
        //                 'p.file_path',
        //                 'c.amount',
        //                 'c.status',
        //                 'p.description',
        //                 DB::Raw('COUNT(c.product_id) AS Count')
        //                 )
        //             ->groupBy(DB::Raw('COUNT(c.product_id) AS Count'));

            $cart_data = Cart::where('user_id',$user->getKey())
                            ->join('products AS p','p.id','carts.product_id')
                            ->get()
                            ->groupBy('product_id')
                            ->map(function ($product, $key) {
                                
                                $product_count =  $product->count();
                                $product_amount = $product->sum('amount');
                                
                                $products = $product->unique('product_id');

                                            return [
                                                "id"=> $products[0]['id'],
                                                "user_id"=>  $products[0]['user_id'],
                                                "product_id"=> $products[0]['product_id'],
                                                "date"=>  $products[0]['date'],
                                                "status"=>  $products[0]['status'],
                                                "amount"=>  $product_amount,
                                                "count" => $product_count,
                                                "name"=> $products[0]['name'],
                                                "file_path" => $products[0]['file_path'],
                                                "description" => $products[0]['description']
                                            ];
                                    })->values();
                                    return [$cart_data];

                    // return (collect($cart_data));
    }

    public function order()
    {
            $order = request()->validate([
                'user_id' => 'required',
                'product_id' => 'required',
                'date' => 'required',
                'status' => 'required',
                'amount' => 'required',
            ]);

            Order::create($order);
            return ['Order saved successfully'];
    }

    public function cartDelete()
    {
        Cart::where('carts.user_id',request()->user_id)->where('carts.product_id',request()->id)->delete();

        return ['Successfully product deleted from the cart'];
    }

    public function search()
    {
        $products = Product::where('name','like',"%".request()->search."%")
                // ->orWhere('description','like',"%".request()->search."%")
                ->get();

                if($products->isEmpty())
                {
                    return ['No matches available'];
                }else{
                    return $products;
                }
    }
}
