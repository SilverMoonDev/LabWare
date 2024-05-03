<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'cas_number',
        'name',
        'ml',
        'concentration',
        'expire_date',
        'cabinet',
        'history'
    ];
}
