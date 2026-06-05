---
title: "M-Pesa API Flows"
date: "2026-06-05"
kind: "Payments"
author: "Imran Ngati"
authorImage: "/favicon.png"
readTime: "6 min read"
blurb: "STK Push, C2B and B2C flows with reconciliation webhooks and idempotent transaction handling."
tags: ["Daraja API", "Webhooks", "Node.js"]
customBackground: ["#fffbeb", "#451a03"]
coverImage: "/images/mpesa-cover.jpg"
---

Payments are non-negotiable. This article covers how we implemented idempotent webhooks to handle transaction reconciliation, ensuring that no payment goes unrecorded during network failures.

[https://github.com/imrany/](https://github.com/imrany)
