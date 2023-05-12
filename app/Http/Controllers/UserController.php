<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register()
    {
        // dd(request()->all());

        $attributes = request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'user_type' => 'required',
            'address' => 'required',
            'telephone' => 'required',
        ]);

        $user = User::create($attributes);
        // auth()->login($user);

        return $user;
    }

    public function login()
    {
        $user = User::where('email',request()->email)->first();
        if($user && !Hash::check(request()->password, $user->password))
        {
            return ['Error'=>'User credentials not matched'];
        }
        return $user;
    }
}
