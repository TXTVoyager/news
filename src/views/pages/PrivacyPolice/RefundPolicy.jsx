import React from "react";
import NavBarNew from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getToken } from "../../../helper/Session";

const RefundPolicy = () => {
  const isLoggedIn = getToken();
  return (
    <>
      {<NavBarNew />}
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 trams-condition-page">
            <h2>Refund Policy</h2>
            <p className="trams-title">TXTVIEWS</p>
            <div className="trams-condition-text-area">
              <p>
              Our digital subscriptions and one-time payment digital items provide ongoing access to premium content or services. By purchasing a subscription or digital item, you agree to the terms outlined in this policy.
</p><p>
1. Non-Refundable - All Digital Purchases:

<b>All digital items and subscriptions are non-refundable.</b> Once a subscription or digital item is purchased, we do not offer refunds for unused or partially used items or subscription periods, including but not limited to monthly, annual, or other subscription plans.
</p><p>
2. Exceptions:

Refunds may be considered under the following conditions:
<br/><br/>
2.A. Technical Issues:
If you encounter significant technical issues on our store (www.txtviews.com) that prevent access to your subscription or purchased digital content and services, and the issue remains unresolved within 48 hours after you first contact us, you may be eligible for a refund.

To request support, please email us at [contact@txtviews.com] and complete the contact form with full details of the issue. Our support team will investigate and aim to provide a resolution within 48 hours of your report, provided that your request is made within 24 hours of product delivery.<br/>

    ⚠️ Please Note: If you contact us after 24 hours from the time of product delivery, resolution may take longer. Priority support and faster resolution are extended to recent purchases reported within 24 hours of delivery.<br/>
    This refund policy only applies to issues arising on our Platform ( www.txtviews.com ) and its official applications. We are not responsible for technical issues caused by third-party platforms, services, or tools not operated by us, and such cases are not covered under this policy. Delays caused by incomplete or incorrect information provided by the customer may also extend the timeframe.
    <br/>
2.B. Misrepresentation: If the subscription or digital item does not significantly match the description provided at the time of purchase or is not delivered as promised, you may request a refund. Note: the content and services provided shall not be less than but can be more than what is promised unless explicitly stated on the product page or its description. Additional and bonus contents, perks and services do not constitute a mismatch. 
Contact us within 24 hours of product delivery with evidence of the discrepancy, and we will review your request and post verification provide a full refund in such cases.
<br/>
<b>2.C. If the seller does not attempt to deliver the digital product within 3 business days or 8 business days for physical products, you may request a refund by reaching out to us using the contact information provided in the Contact Us section below.
<br/></b>
    ⚠️ Exceptions:
    Please note that this timeframe may be extended in cases of:

         ▸ National or regional holidays

         ▸ Force majeure events (e.g., natural disasters or strikes)

         ▸ Delays caused by incomplete or incorrect information provided by the customer.

We will make reasonable efforts to notify you of any anticipated delays.
</p><p>
3. Refund Process:

To request a refund, please follow these steps:

Contact Support: Email us at support email or fill contact form with your order number, details of the issue, and any supporting documentation or screenshots.
Review and Verification: We will review your request and verify the details. Please allow up to 7 business days for us to process and respond.
Resolution: If your request is approved, we will issue a refund to the original payment method. Please note that processing times may vary depending on your payment provider.
</p><p>
4. Cancellation Policy - Subscription Items Only:

Automatic Renewal: Subscriptions may automatically renew at the end of each billing period unless canceled. To avoid automatic renewal, ensure you cancel your subscription before the next billing cycle.

Cancellation Process: To cancel your subscription, please follow the cancellation instructions provided in your account settings or contact our support team for assistance.
</p><p>
5. Returns for Digital and Physical Products:

Digital Products: All digital products are non-refundable. Returns and exchanges are not offered. However, returns are accepted within 24 hours of delivery if the item does not significantly match its description or specifications as per product exceptions policy stated above. Contact us to request a return, and after verification, we will refund the full order amount. Please note that return shipping costs are not applicable to digital products.

Physical Products: Returns are accepted within 48 hours of delivery if the item does not match its description or specifications. Contact us to request a return, and after verification, we will refund the full order amount minus return shipping costs. Please note that no returns will be accepted if the item is damaged, partially used, or tampered with by the customer.
</p><p>
6. Damaged Orders:

Digital Products: If you experience issues with your digital product, such as corruption or incorrect files, please email us at support email or fill contact form  with your order number and details of the issue. We will address these cases individually and aim to provide a satisfactory solution. Please allow up to 7 business days for a response.

Physical Products: If your order arrives damaged, please email us at support email or fill contact form with your order number and a photo of the damage. We will address these cases individually and aim to provide a satisfactory solution. Please allow up to 7 business days for a response. No returns will be accepted if the item is damaged, partially used, or tampered with by the customer.
</p><p>
7. Contact Us:

For any further questions or concerns regarding refunds, returns, or cancellations, please reach out to our support team at 
contact@txtviews.com <br/> We are here to help and ensure your satisfaction with our services.

</p><p>
8. CHANGES TO THIS REFUND POLICY:

We reserve the right to change this Policy at our sole discretion at any time. Any material changes to this Policy will be posted on this page. We encourage you to review this Policy regularly for such changes. The updated Refund Policy will take effect as soon as it has been updated.

</p><p>This Policy was last updated as of <span>May 4th, 2025.</span>
              </p>
              <button>I agree</button>
            </div>
          </div>
        </div>
      </div>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};

export default RefundPolicy;
