<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvestorPaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('paymethod', [InvestorPaymentController::class, 'paymethod']);
Route::get('investor', [InvestorPaymentController::class, 'investor']);
Route::post('paymentajax', [InvestorPaymentController::class, 'paymentajax']);
Route::post('savePayment', [InvestorPaymentController::class, 'savePayment']);