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
| **Payment app** ([TPAP](# "Third-party app provider")), like PhonePe | The screen you use. Holds no money in a bank-account payment | Front desk |
| **Sponsor bank** ([PSP](# "payment service provider")), like Axis Bank | Connects the app to UPI and answers for it | The app's way in |
| **NPCI** | Runs UPI, routes every message, works out who owes what | Telephone exchange |
| **Your bank** (remitter or issuer), HDFC here | Checks your PIN and takes the money out | Your locker |
| **Friend's bank** (beneficiary), ICICI here | Puts the money in | Your friend's locker |
| **RBI** | Holds an account for each bank, where banks finally pay each other | The banks' bank |

**NPCI** is a [not-for-profit promoted by banks](https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082), not a government department.  
[Here](https://pay.google.com/intl/en_in/about/external/npci/) are the details for all the roles & responsibilites.

## 3. How UPI actually works !

![UPI Diagram](/Blogs/upi.png)

1. **You send ₹500.** In PhonePe, you enter your friend's UPI ID, the amount and your UPI PIN.
2. **PhonePe passes the request to its sponsor bank, Axis.** The app can't connect to UPI by itself.
3. **Axis forwards it to NPCI.** This is the central switch that every UPI payment goes through.
4. **NPCI finds your friend's account.** It asks your friend's sponsor bank, Yes Bank, which account is linked to that UPI ID. That's why you never type an account number.
5. **Your bank takes the money out.** NPCI sends the request to HDFC, which checks your PIN and balance, then debits ₹500.
6. **Your friend's bank adds the money.** NPCI tells ICICI to credit ₹500, and ICICI does it straight away.
7. **Both phones get the news.** NPCI reports the result to both sponsor banks. Axis tells your app the money was sent, and Yes Bank tells your friend's app it arrived.
8. **NPCI settles up between the banks later, through RBI.** Steps 1 to 7 were only messages and balance updates. This is when money actually moves between the banks.

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
- **Infrastructure and certification.** It provides the connection and makes sure the app's systems are secure and audited.
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

So `@ybl` doesn't mean your money is at Yes Bank. Your account can be at any bank on UPI. The handle only names the [bank sponsoring that app (look for P2P members)](https://www.npci.org.in/product/upi/all-members).

## 6. The banks haven't paid each other yet

Go back to step 7. Your balance dropped at HDFC and your friend's rose at ICICI, but no money travelled between them. Those were two separate ledger updates at two banks. ICICI has just given your friend ₹500 it hasn't received.

The real payment between banks is called settlement, and it happens later:

1. Every member bank has an account with RBI.
2. NPCI batches the payments from a time window and works out what each bank owes or is owed overall.
3. The difference moves between the banks' RBI accounts.

UPI runs [10 settlement cycles for payments, plus 2 for disputes](https://simpliance.in/India/FCC/govt_notification/Central/circular-regarding-segregation-of-upi-settlement-cycles-for-auth-and-dispute-transactions-7367).

Batching works because of netting. Payments flow in both directions all day, and much of that cancels out (like a simplify dept in splitwise).

![upi-settlement](/Blogs/upi2.png)

That is how UPI feels instant. The messages are real-time, while the money moves in batches. The trade-off is that a bank spends part of the day having credited money it's still waiting to receive.

## 7. When it goes wrong

The classic UPI failure is "money debited but payment failed", and it happens between steps 5 and 6 of the flow in section 3.

Your bank debits first. If your friend's bank then declines or doesn't respond, your ₹500 is stuck in between (out of your account, but not in theirs).

RBI has [a rule for this](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11693&Mode=0). If your friend's bank can't credit the money, it must reverse the payment by T+1 (the day after the payment). Merchant payments get until T+5. If it's late, the bank owes ₹100 for each day of delay, and it's meant to pay automatically.

For example, say you pay on Monday, so the deadline is Tuesday. If the ₹500 only comes back on Thursday, that's 2 days late, and the bank owes ₹200 on top of the ₹500.

Before paying again, check the payment's status, or your friend may end up with ₹1,000.

If it still isn't fixed, complain in this order:  
**Your app → its sponsor bank → your bank → NPCI → RBI Ombudsman**

## 8. So who pays for it?

Not you. Person-to-Person(P2P) payments stay free at any amount, and apps can't add a platform fee to UPI payments. But as RBI Governor Sanjay Malhotra [said in August 2025](https://www.ndtv.com/business-news/rbi-governor-sanjay-malhotra-charges-upi-transactions-mdr-digital-payments-11868593).  
"It is not free even now, someone is paying for it."

### How much does it cost?

**Paying a person (P2P)**

There's no official number. The clearest breakdown I've found is from [Nikhil Kamath's podcast on UPI](https://youtu.be/hBvInWQWpZ0?t=3546&si=6zxhwFAWk6JvYHCV), which puts it at about 25 [bips](# "bips is a standardized unit of measurement equals to 1/100th of 1%. A basis point (a 'bip' ) is 0.01%, so 25 bips means 25 paise on every ₹100."). I couldn't find these details in any published document, so treat them as the podcast's account:

- **Who pays.** Your bank. It pays the app's sponsor bank 15 to 50 paise. In our example, that's HDFC.
- **Who gets the money.** The sponsor bank (Axis here), and the app (PhonePe) negotiates a share of it. That helps pay for things like two-factor authentication calls and fraud checks.
- **Why your bank agrees.** Each UPI payment can save it the cost of an ATM withdrawal or a branch visit.
- **How your bank earns it back.** From float, the money customers keep in their accounts. UPI itself leaves little float to earn from, because payments are real-time and NPCI runs settlement 10 times a day.

NPCI's own technology bill is small by comparison: [about ₹500 crore a year](https://www.indiatoday.in/business/story/npci-rs-500-crore-profit-half-of-world-digital-payment-upi-transactions-2792595-2025-09-24) across UPI, [IMPS](https://www.npci.org.in/product/imps/about-imps "Immediate Payment Service, an instant, 24/7/365 electronic interbank fund transfer system") and [NACH](https://www.npci.org.in/product/nach "National Automated Clearing House, a web-based payment system to handle high-volume, repetitive, and bulk electronic transactions between bank accounts.").

**Paying a merchant (P2M)**

[RBI's 2022 paper](https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=21082) estimated ₹2 on an ₹800 payment, shared across the banks, the app and NPCI. That's also 25 bips, but the figure is four years old.

**All of UPI together**

Industry estimates quoted by NPCI in 2026 put the total at about ₹20,000 crore a year. Across [24,162 crore payments in FY26](https://www.outlookmoney.com/banking/upi-transaction-value-reaches-rs-314-lakh-crore-in-fy26-govt-says-in-lok-sabha), that's about 83 paise a payment.

So treat 25 bips as a rough guide, not a fixed rate. Applied to all ₹314 lakh crore of FY26 payments, it would come to about ₹78,000 crore, nearly four times that estimate. A ₹50,000 transfer takes the same trip as a ₹100 one, so the cost probably follows the number of payments more than the amount.

### Who covers it today?

| Who | How |
| --- | --- |
| Banks and apps | Absorb most of it. Banks [cross-subsidise from lending, deposits and card fees](https://blackbearlabs.in/article/the-economics-of-upi-who-pays-for-india-s-free-payment-system) |
| Government | Pays incentives, such as [₹1,500 crore for FY25](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2112771) on small-merchant payments up to ₹2,000. NPCI calls subsidies "short-term bridge funding" |
| Some merchants | Pay on wallet payments above ₹2,000, with [interchange of up to 1.1%](https://www.business-standard.com/amp/finance/news/upi-charges-here-is-how-interchange-fees-on-wallet-payments-will-work-123032900714_1.html), and on credit-linked UPI under credit rules |

Apps need another way to make money. [Finshots' read of PhonePe's filing](https://finshots.in/archive/breaking-down-the-phonepe-drhp/) calls person-to-person transfers, QR payments at kirana stores and bill payments "loss-making or close to zero-margin". The earnings come from merchant payment gateways, devices like soundboxes, ads, and distributing loans and insurance. Even at that scale, PhonePe [lost ₹2,792 crore in FY26](https://inc42.com/buzz/ipo-bound-phonepe-posts-%E2%82%B92792-cr-loss-in-fy26-revenue-up-11-5-yoy/), though employee stock costs and write-offs drove much of that.

Free UPI is how apps get you in the door. They make their money on what they sell you once you're inside.

### What's changing: bigger merchants start paying

NPCI announced a merchant fee, called MDR (merchant discount rate), to start on 15 October 2026. Two days before that, it [deferred the fee until after Diwali](https://www.theweek.in/news/biz-tech/2026/10/13/npci-defers-upi-mdr-until-after-diwali.html), with the date to be notified. The planned structure looks like this:

| Payment | You pay | Merchant pays |
| --- | --- | --- |
| To a person or yourself, any amount | ₹0 | None |
| To any merchant, up to ₹2,000 | ₹0 | ₹0 |
| To a small merchant (P2PM), up to ₹1 lakh a month by QR | ₹0 | ₹0 |
| AutoPay and other recurring mandates | ₹0 | ₹0 |
| To a merchant, above ₹2,000 | ₹0 | 0.4% (₹12 on ₹3,000), capped at ₹300 from ₹75,000 |
| Railways, telecom, insurance, fuel, utilities, above ₹2,000 | ₹0 | Flat ₹5 |
| Mutual funds and brokers | ₹0 | 0.02%, capped at ₹300 |

Merchants aren't allowed to pass this on to customers (as if they won't increase the service charges : ). For comparison, NPCI puts credit card MDR at 1.5% to 2.5% and debit cards at up to 0.90%.

## 9. Same rails, different money

Some UPI features change where the money comes from, or how the payment is approved.

| Feature | What's different |
| --- | --- |
| UPI Lite | A small pre-loaded balance, up to [₹1,000 a payment and ₹5,000 in total](https://www.outlookmoney.com/banking/upi-lite-is-here-with-enhanced-featurescan-you-use-it-online-know-the-details), with no PIN per payment |
| Wallet on UPI | Pays from a prepaid balance, not a bank account |
| RuPay credit card or credit line | The money is a short-term loan, so credit rules apply instead of the new MDR |
| AutoPay | A standing approval for bills and subscriptions |
| UPI 123PAY | For feature phones, [using IVR or missed calls](https://www.phonepe.com/press/phonepe-launches-upi-payments-for-indias-feature-phone-users) |
| UPI abroad | [Live in 8 countries](https://moneyview.in/upi/upi-accepted-countries) outside India |

## 10. Two apps hold the front door

The network is open to everyone, but [in August 2026](https://inc42.com/buzz/upi-in-august-navis-market-share-climbs-to-4-4-phonepe-google-pay-slip/) PhonePe handled 45.9% of UPI transactions and Google Pay 32.4%. That's 78.3% through two companies. Paytm had 8.1% and Navi 4.4%.

NPCI wants to cap each app at 30% of volume, and the deadline has been pushed to 31 December 2026.

## 11. The whole thing in six lines

1. The app is the front desk. It never holds your money in a bank-account payment.
2. The sponsor bank puts the app on the network and answers for it.
3. NPCI routes the messages. Your bank debits and your friend's bank credits.
4. The real bank-to-bank payment happens later, netted at RBI.
5. A failed credit must be reversed by T+1, or the bank owes ₹100 a day.
6. You pay nothing. Banks, apps and the government carry it today, and bigger merchants are next.

**Fun facts**:

- UPI's record day was 9 October 2026, with 873 million payments. That averages more than 10,000 every second.
- In October 2026 it handled 25.47 billion payments worth ₹31.53 lakh crore, over ₹1 lakh crore a day for the first time.
- UPI's whole first full year, FY17, had 1.78 crore payments. On its record day, it did that many in about 30 minutes.
- UPI handled about 49% of the world's real-time payments in 2023.
- In the second half of 2025, UPI was 85.5% of India's payments but only 9.5% of the money. RTGS was 0.1% of payments and 68.6% of the money.
- In FY26, most payments went to shops (63%), but most money went between people (71%).
- In mid-2025, UPI passed about 640 million payments a day, ahead of Visa's worldwide average of 639 million.
- Indian tourists can buy Eiffel Tower tickets with UPI.
