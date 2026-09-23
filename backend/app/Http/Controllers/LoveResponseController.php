<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\LoveResponse;
use Illuminate\Http\JsonResponse;

class LoveResponseController extends Controller
{
    public function index(): JsonResponse
    {
        $response = LoveResponse::latest()->first();
        return response()->json([
            'success' => true,
            'data' => $response ?? [
                'recipient_name' => 'special ফুল',
                'response_status' => 'pending',
                'no_click_count' => 0,
            ]
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'recipient_name' => 'nullable|string',
            'response_status' => 'required|string',
            'no_click_count' => 'nullable|integer',
        ]);

        $response = LoveResponse::create([
            'recipient_name' => $validated['recipient_name'] ?? 'special ফুল',
            'response_status' => $validated['response_status'],
            'no_click_count' => $validated['no_click_count'] ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Response recorded successfully!',
            'data' => $response,
        ], 201);
    }
}
