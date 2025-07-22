<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'status',
        'estimated_days'
    ];

    /**
     * Un proyecto pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Un proyecto puede tener muchos servicios contratados.
     */
    public function services()
    {
        return $this->belongsToMany(Service::class)
                    ->withPivot('price')
                    ->withTimestamps();
    }
    //PAQUETES
    public function package()
    {
    return $this->belongsTo(Package::class);
    }
}
