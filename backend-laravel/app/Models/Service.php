<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
    ];

    /**
     * Un servicio puede estar en muchos proyectos.
     */
    public function projects()
    {
        return $this->belongsToMany(Project::class)
                    ->withPivot('price')
                    ->withTimestamps();
    }
}
