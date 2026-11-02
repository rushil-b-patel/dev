---
title: "How UPI works, and who pays for it"
date: "2026-11-02"
description: "Follow ₹500 through UPI, from your phone to RBI: why PhonePe needs a bank, why banks settle hours later, and who pays for a payment that costs you nothing."
---

You scan a QR code, type your PIN, and a few seconds later your phone says ₹500 sent. It costs you nothing.

India did this [2,451 crore times in August 2026](https://www.npci.org.in/uploads/FA_Qs_Merchant_Discount_Rate_MDR_on_Select_UPI_P2_M_Transactions_58dba1d39e.pdf#page=3), moving ₹29.9 lakh crore. Two things about those few seconds are easy to miss:

- When your friend's phone buzzes, the two banks haven't paid each other yet.
- The "free" payment is part of a system that costs [about ₹20,000 crore a year](https://www.npci.org.in/uploads/FA_Qs_Merchant_Discount_Rate_MDR_on_Select_UPI_P2_M_Transactions_58dba1d39e.pdf#page=2) to run, so someone is paying.

This post follows one ₹500 payment from your phone to RBI, then follows the money behind it.

## 1. UPI in one line

**UPI** (_Unified Payments Interface_) is not an app or a bank. It's a shared network and rulebook that lets any UPI app reach any bank on the network.

Email is a good way to picture it. You can write from Gmail to an Outlook address without knowing anything about Outlook's servers. UPI does the same for money: you pay `friend@okaxis` and never see an account number or IFSC code.

## 2. Who does what

| Who | Job | Think of it as |
| --- | --- | --- |
| **Payment app** (TPAP), like PhonePe | The screen you use. Holds no money in a bank-account payment | Front desk |
| **Sponsor bank** (PSP), like Axis Bank | Connects the app to UPI and answers for it | The app's way in |
| **NPCI** | Runs UPI, routes every message, works out who owes what | Telephone exchange |
| **Your bank** (remitter or issuer), HDFC here | Checks your PIN and takes the money out | Your locker |
| **Friend's bank** (beneficiary), ICICI here | Puts the money in | Your friend's locker |
| **RBI** | Holds an account for each bank, where banks finally pay each other | The banks' bank |

**TPAP**: third-party app provider  
**PSP**: payment service provider.  
NPCI is a [not-for-profit promoted by banks](https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082), not a government department.

## 3. How UPI actually works !

![UPI Diagram](/Blogs/upi.png)

1. **You send ₹500.** In PhonePe, you enter your friend's UPI ID, the amount and your UPI PIN.
2. **PhonePe passes the request to its sponsor bank, Axis.** The app can't connect to UPI by itself.
3. **Axis forwards it to NPCI.** This is the central switch that every UPI payment goes through.
4. **NPCI finds your friend's account.** It asks your friend's sponsor bank, Yes Bank, which account is linked to that UPI ID. That's why you never type an account number.
5. **Your bank takes the money out.** NPCI sends the request to HDFC, which checks your PIN and balance, then debits ₹500.
6. **Your friend's bank adds the money.** NPCI tells ICICI to credit ₹500, and ICICI does it straight away.
7. **Both phones get the news.** NPCI reports the result to both sponsor banks. Axis tells your app the money was sent, and Yes Bank tells your friend's app it arrived.
8. **The banks settle up later through RBI.** Steps 1 to 7 were only messages and balance updates. This is when money actually moves between the banks.

## 4. How UPI knows it's really you

Every payment has to pass two checks.

**Your phone, which you have.** At setup, the app verifies your number and creates a device fingerprint. Later payments are checked against it, which is why a new phone or SIM means setting up UPI again.

**Your PIN, which you know.** You type it into NPCI's common library, which encrypts it before it leaves your phone. The app forwards that sealed copy. Your own bank does the check, and it stores only a salted hash, not the PIN.

> You need a PIN to send money, never to receive it. If someone says "enter your PIN to get your refund", it's a scam. NPCI [ended person-to-person collect requests from October 2025](https://www.theweek.in/wire-updates/business/2025/08/14/dcm65-biz-npci-collect.html) because fraudsters kept misusing them. Merchants can still send them, so read what you're approving.

## 5. Why PhonePe needs a bank at all

PhonePe could build a perfect app and still couldn't move your money alone.

UPI moves money between bank accounts, and only banks can settle with each other. A non-bank app has no account at RBI and no customer deposits. Even if it could send the message "debit A ₹500, credit B ₹500", it couldn't settle anything. So whoever plugs into NPCI must be a bank, or a regulated entity with settlement access.

That bank is the sponsor, and it does three jobs:

- **Membership and liability.** It signs the agreements and answers to NPCI and RBI for transactions, including fraud, disputes and compliance.
- **Infrastructure and certification.** It provides the connection and [makes sure the app's systems are secure and audited](https://pay.google.com/intl/en_in/about/external/npci/).
- **Regulatory cover.** RBI supervises banks far more tightly than tech companies.

You can spot your sponsor in your own UPI ID. Look at the part after the `@`:

| Handle | App | Sponsor bank |
| --- | --- | --- |
| `@ybl` | PhonePe | Yes Bank |
| `@ibl` | PhonePe | ICICI |
| `@axl` | PhonePe | Axis |
| `@okaxis` | Google Pay | Axis |
| `@okhdfcbank` | Google Pay | HDFC |
| `@okicici` | Google Pay | ICICI |
| `@oksbi` | Google Pay | SBI |

So `@ybl` doesn't mean your money is at Yes Bank. Your account can be at any bank on UPI. The handle only names the [bank sponsoring that app](https://www.npci.org.in/product/upi/all-members).

## 6. The banks haven't paid each other yet

Go back to step 7. Your balance dropped at HDFC and your friend's rose at ICICI, but no money travelled between them. Those were two separate ledger updates at two banks. ICICI has just given your friend ₹500 it hasn't received.

The real payment between banks is called settlement, and it happens later:

1. Every member bank has an account with RBI.
2. NPCI batches the payments from a time window and works out what each bank owes or is owed overall.
3. The difference moves between the banks' RBI accounts.

UPI runs [10 settlement cycles for payments, plus 2 for disputes](https://simpliance.in/India/FCC/govt_notification/Central/circular-regarding-segregation-of-upi-settlement-cycles-for-auth-and-dispute-transactions-7367).

Batching works because of netting. Payments flow in both directions all day, and much of that cancels out (like a simple dept in splitwise). Press the button to see it:

![upi-settlement](/Blogs/upi2.png)

That is how UPI feels instant: the messages are real-time, while the money moves in batches. The trade-off is that a bank spends part of the day having credited money it's still waiting to receive. RBI notes that settling this way ["involves additional costs to the system"](https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082).

## 7. When it goes wrong

The classic UPI failure is "money debited but payment failed", and it happens between steps 5 and 6 of the flow in section 3.

Your bank debits first. If your friend's bank then declines or doesn't respond, your ₹500 is stuck in between (out of your account, but not in theirs).

RBI has [a rule for this](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11693&Mode=0). If your friend's bank can't credit the money, it must reverse the payment by T+1 (the day after the payment). Merchant payments get until T+5. If it's late, the bank owes ₹100 for each day of delay, and it's meant to pay automatically.

For example, say you pay on Monday, so the deadline is Tuesday. If the ₹500 only comes back on Thursday, that's 2 days late, and the bank owes ₹200 on top of the ₹500.

Before paying again, check the payment's status, or your friend may end up with ₹1,000.

If it still isn't fixed, [complain in this order](https://pay.google.com/intl/en_in/about/external/npci/):  
**Your app → its sponsor bank → your bank → NPCI → RBI Ombudsman**

## 8. So who pays for it?

Not you. Person-to-Person(P2P) payments stay free at any amount, and apps can't add a platform fee to UPI payments. But as RBI Governor Sanjay Malhotra [said in August 2025](https://www.ndtv.com/business-news/rbi-governor-sanjay-malhotra-charges-upi-transactions-mdr-digital-payments-11868593).  
"It is not free even now, someone is paying for it."

### How much does it cost?

Two numbers get quoted:

- **₹2 on an ₹800 merchant payment**, from [RBI's 2022 paper](https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082) ([summary](https://www.shankariasparliament.com/current-affairs/upi-payment-charges)). That's 0.25%, or 25 basis points. One basis point (a "bip") is 0.01%.
- **About ₹20,000 crore a year**, from industry estimates [quoted by NPCI in 2026](https://www.npci.org.in/uploads/FA_Qs_Merchant_Discount_Rate_MDR_on_Select_UPI_P2_M_Transactions_58dba1d39e.pdf).

These two don't line up. Taking 0.25% of [FY26's ₹314 lakh crore in UPI payments](https://startuptalky.com/upi-mdr-revenue-who-gets-paid-banks-phonepe-googlepay-paytm/) gives about ₹78,000 crore, nearly four times the estimate. Part of the gap is probably that costs follow messages more than rupees, since a ₹50 payment and a ₹50,000 payment take the same trip. So treat 25 bips as an old estimate for one typical merchant payment, not a fixed rate.

Neither number is for person-to-person (P2P) payments, and I couldn't find a published P2P figure. The closest I can get is an average: ₹20,000 crore across [24,162 crore UPI payments in FY26](https://www.outlookmoney.com/banking/upi-transaction-value-reaches-rs-314-lakh-crore-in-fy26-govt-says-in-lok-sabha) is about 83 paise a payment. If your ₹500 transfer costs that much, that's about 0.17%, or 17 bips.

P2P made up [37% of payments and 71% of value](https://www.businesstoday.in/india/story/10-years-of-upi-transaction-value-surges-4000-fold-to-reach-rs314-lakh-crore-550975-2026-08-24) in FY26. At 83 paise each, that's about ₹7,400 crore a year, or roughly 3 bips on the money moved. This is my own rough estimate, not an official number. P2P could well cost less, since there's no merchant to sign up or support. No customer fee, merchant fee or government incentive pays for this share.

### Who covers it today?

| Who | How |
| --- | --- |
| Banks and apps | [Absorb most of it](https://pointales.com/how-upi-works-and-who-pays-for-it/). Banks [cross-subsidise from lending, deposits and card fees](https://blackbearlabs.in/article/the-economics-of-upi-who-pays-for-india-s-free-payment-system) |
| Government | Pays incentives, such as [₹1,500 crore for FY25](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2112771) on small-merchant payments up to ₹2,000. NPCI calls subsidies ["short-term bridge funding"](https://www.npci.org.in/uploads/FA_Qs_Merchant_Discount_Rate_MDR_on_Select_UPI_P2_M_Transactions_58dba1d39e.pdf) |
| Some merchants | Pay on wallet payments above ₹2,000, with [interchange of up to 1.1%](https://www.business-standard.com/amp/finance/news/upi-charges-here-is-how-interchange-fees-on-wallet-payments-will-work-123032900714_1.html), and on credit-linked UPI under credit rules |

Apps need another way to make money. [Finshots' read of PhonePe's filing](https://finshots.in/archive/breaking-down-the-phonepe-drhp/) calls person-to-person transfers, QR payments at kirana stores and bill payments "loss-making or close to zero-margin". The earnings come from merchant payment gateways, devices like soundboxes, ads, and distributing loans and insurance. Even at that scale, PhonePe [lost ₹2,792 crore in FY26](https://inc42.com/buzz/ipo-bound-phonepe-posts-%E2%82%B92792-cr-loss-in-fy26-revenue-up-11-5-yoy/), though employee stock costs and write-offs drove much of that.

Free UPI is how apps get you in the door. They make their money on what they sell you once you're inside.

### What's changing: bigger merchants start paying

NPCI announced a merchant fee, called MDR (merchant discount rate), to start on 15 October 2026. Two days before that, it [deferred the fee until after Diwali](https://www.theweek.in/news/biz-tech/2026/10/13/npci-defers-upi-mdr-until-after-diwali.html), with the date to be notified. I couldn't find a new date as of 2 November 2026. The [planned structure](https://www.npci.org.in/uploads/FA_Qs_Merchant_Discount_Rate_MDR_on_Select_UPI_P2_M_Transactions_58dba1d39e.pdf) looks like this:

| Payment | You pay | Merchant pays |
| --- | --- | --- |
| To a person or yourself, any amount | ₹0 | None |
| To any merchant, up to ₹2,000 | ₹0 | ₹0 |
| To a small merchant (P2PM), up to ₹1 lakh a month by QR | ₹0 | ₹0 |
| AutoPay and other recurring mandates | ₹0 | ₹0 |
| To a merchant, above ₹2,000 | ₹0 | 0.4% (₹12 on ₹3,000), capped at ₹300 from ₹75,000 |
| Railways, telecom, insurance, fuel, utilities, above ₹2,000 | ₹0 | Flat ₹5 |
| Mutual funds and brokers | ₹0 | 0.02%, capped at ₹300 |

Merchants aren't allowed to pass this on to customers. For comparison, NPCI puts credit card MDR at 1.5% to 2.5% and debit cards at up to 0.90%. Reports differ on how the fee gets split between banks and apps. NPCI leaves that to its steering committee.

## 9. Same rails, different money

Some UPI features change where the money comes from, or how the payment is approved.

| Feature | What's different |
| --- | --- |
| UPI Lite | A small pre-loaded balance, up to [₹1,000 a payment and ₹5,000 in total](https://www.outlookmoney.com/banking/upi-lite-is-here-with-enhanced-featurescan-you-use-it-online-know-the-details), with no PIN per payment |
| Wallet on UPI | Pays from a prepaid balance, not a bank account |
| RuPay credit card or credit line | The money is a short-term loan, so [credit rules apply](https://www.npci.org.in/uploads/FA_Qs_Merchant_Discount_Rate_MDR_on_Select_UPI_P2_M_Transactions_58dba1d39e.pdf) instead of the new MDR |
| AutoPay | A standing approval for bills and subscriptions |
| UPI 123PAY | For feature phones, [using IVR or missed calls](https://razorpay.com/blog/?p=27005) |
| UPI abroad | [Live in 11 countries](https://www.npci.org.in/uploads/FA_Qs_Merchant_Discount_Rate_MDR_on_Select_UPI_P2_M_Transactions_58dba1d39e.pdf) outside India |

## 10. Two apps hold the front door

The network is open to everyone, but [in August 2026](https://inc42.com/buzz/upi-in-august-navis-market-share-climbs-to-4-4-phonepe-google-pay-slip/) PhonePe handled 45.9% of UPI transactions and Google Pay 32.4%. That's 78.3% through two companies. Paytm had 8.1% and Navi 4.4%.

NPCI wants to cap each app at 30% of volume, and [the deadline has been pushed to 31 December 2026](https://www.businesstoday.in/amp/tech-today/news/story/npci-extends-30-upi-market-share-cap-deadline-on-3rd-party-apps-to-december-2026-459171-2024-12-31). That's less than two months away, and I couldn't find a final decision on it. NPCI's case for the merchant fee is partly about this too: with zero fees, it says, ["only well-capitalised tech conglomerates can afford to sustain long-term operational losses"](https://www.npci.org.in/uploads/FA_Qs_Merchant_Discount_Rate_MDR_on_Select_UPI_P2_M_Transactions_58dba1d39e.pdf).

## 11. The whole thing in six lines

1. The app is the front desk. It never holds your money in a bank-account payment.
2. The sponsor bank puts the app on the network and answers for it.
3. NPCI routes the messages. Your bank debits and your friend's bank credits.
4. The real bank-to-bank payment happens later, netted at RBI.
5. A failed credit must be reversed by T+1, or the bank owes ₹100 a day.
6. You pay nothing. Banks, apps and the government carry it today, and bigger merchants are next.

## Refrences:
[The transaction cycle](https://setu.co/blog/upi-102-the-transaction-cycle)
[The settlement](https://setu.co/blog/upi-103-the-settlement)