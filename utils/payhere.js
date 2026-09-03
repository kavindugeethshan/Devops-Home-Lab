import crypto from "crypto";

export const generatePayHereHash = (
    merchantId,
    orderId,
    amount,
    currency,
    merchantSecret
) => {
    const formattedAmount = Number(amount).toFixed(2);

    const secretHash = crypto
        .createHash("md5")
        .update(merchantSecret)
        .digest("hex")
        .toUpperCase();

    const hashString =
        merchantId +
        orderId +
        formattedAmount +
        currency +
        secretHash;

    return crypto
        .createHash("md5")
        .update(hashString)
        .digest("hex")
        .toUpperCase();
};

export const verifyPayHereNotifyHash = (
    merchantId,
    orderId,
    payhereAmount,
    payhereCurrency,
    statusCode,
    merchantSecret,
    md5sig
) => {
    const formattedAmount = Number(payhereAmount).toFixed(2);

    const secretHash = crypto
        .createHash("md5")
        .update((merchantSecret || "").trim())
        .digest("hex")
        .toUpperCase();

    const hashString =
        (merchantId || "").toString().trim() +
        (orderId || "").toString().trim() +
        formattedAmount +
        (payhereCurrency || "").toString().trim() +
        (statusCode || "").toString().trim() +
        secretHash;

    const localMd5sig = crypto
        .createHash("md5")
        .update(hashString)
        .digest("hex")
        .toUpperCase();

    const receivedMd5 = (md5sig || "").toString().trim().toUpperCase();

    console.log("=== PayHere Notification Signature Diagnostics ===");
    console.log("Incoming merchant_id:", merchantId);
    console.log("Incoming order_id:", orderId);
    console.log("Incoming payhere_amount (raw):", payhereAmount);
    console.log("Formatted payhere_amount (2 decimals):", formattedAmount);
    console.log("Incoming payhere_currency:", payhereCurrency);
    console.log("Incoming status_code:", statusCode);
    console.log("Incoming md5sig:", receivedMd5);
    console.log("Locally Calculated localMd5sig:", localMd5sig);
    console.log("Signature Match Result:", localMd5sig === receivedMd5);
    console.log("==================================================");

    return localMd5sig === receivedMd5;
};
