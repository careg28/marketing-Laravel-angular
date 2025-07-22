<?php
/**
 * @method \Laravel\Sanctum\NewAccessToken createToken(string $name, array $abilities = [])
 */
namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
    
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // asegúrate de tenerlo en tu migración
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Un usuario puede tener muchos proyectos.
     */
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}