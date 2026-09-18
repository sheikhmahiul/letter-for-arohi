<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoveResponse extends Model
{
    protected $fillable = [
        'recipient_name',
        'response_status',
        'no_click_count',
    ];
}
