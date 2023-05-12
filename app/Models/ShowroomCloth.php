<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShowroomCloth extends Model
{
    use HasFactory;

    public function showroom()
    {
        return $this->belongsTo(Showroom::class);
    }
}
