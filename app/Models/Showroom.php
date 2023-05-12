<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Showroom extends Model
{
    use HasFactory;

    public function showroom_cloth()
    {
        return $this->hasMany(ShowroomCloth::class,'showroom_id');
    }
}
