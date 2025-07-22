<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
   protected $fillable = [
        'project_id',
        'author_name',
        'content',
        'rating'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}