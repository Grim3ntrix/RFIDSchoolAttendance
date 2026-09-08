<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'teacher_id',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /* Relationship */

    /**
     * Avatar initials: first letter of the first and last words of the
     * name (e.g. "Rol K. Sao" -> "RS"). Falls back to the email
     * when no name is set.
     */
    protected function initials(): Attribute
    {
        return Attribute::get(function () {
            $source = trim((string) $this->name) !== '' ? $this->name : $this->email;

            $words = preg_split('/\s+/', trim((string) $source)) ?: [];

            if ($words === []) {
                return '?';
            }

            if (count($words) === 1) {
                return mb_strtoupper(mb_substr($words[0], 0, 1));
            }

            return mb_strtoupper(mb_substr($words[0], 0, 1).mb_substr(end($words), 0, 1));
        });
    }

    /**
     * Avatar background color: picks from a curated palette by hashing the
     * email, so each user keeps a stable color. Red and amber are excluded —
     * they are reserved semantic colors in the design guide. The classes
     * must also be safelisted in tailwind.config.js.
     */
    protected function avatarColor(): Attribute
    {
        return Attribute::get(function () {
            $palette = [
                'bg-sky-600',
                'bg-cyan-600',
                'bg-teal-600',
                'bg-emerald-600',
                'bg-indigo-600',
                'bg-violet-600',
                'bg-fuchsia-600',
                'bg-pink-600',
            ];

            return $palette[abs(crc32((string) $this->email)) % count($palette)];
        });
    }

    public function userStatus()
    {
        return $this->belongsTo(UserStatus::class, 'status_id');
    }

    public function teacher()
    {
        return $this->hasOne(Teacher::class, 'user_id');
    }

    public function student()
    {
        return $this->hasOne(Student::class, 'user_id');
    }

    public function superAdmin()
    {
        return $this->hasOne(SuperAdmin::class, 'user_id');
    }
}
