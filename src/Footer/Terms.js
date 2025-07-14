import React, { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-gray-800 px-6 md:px-20 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">TERMS OF SERVICE</h1>

      <div className="space-y-10">
        {/* SECTION BLOCK */}
        <Section title="OVERVIEW">
          <p>
            This website is operated by Beyond East Official. Throughout the site, the terms “we”, “us”
            and “our” refer to Beyond East Official. Beyond East offers this website and services to you,
            conditioned upon your acceptance of all terms, conditions, policies and notices.
          </p>
          <p>
            By visiting our site and/or purchasing something from us, you agree to be bound by the following terms and conditions (“Terms of Service”). These Terms apply to all users of the site.
          </p>
        </Section>

        <Section title="SECTION 1 - ONLINE STORE TERMS">
          <p>You must be of legal age or have guardian consent to use this website. You agree not to use our products for any unlawful or unauthorized purpose.</p>
        </Section>

        <Section title="SECTION 2 - GENERAL CONDITIONS">
          <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
        </Section>

        <Section title="SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION">
          <p>We are not responsible if information made available on this site is not accurate, complete or current.</p>
        </Section>

        <Section title="SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES">
          <p>Prices are subject to change without notice. We may discontinue or modify services at any time.</p>
        </Section>

        <Section title="SECTION 5 - PRODUCTS OR SERVICES">
          <p>Certain products or services may be available exclusively online and subject to exchange only according to our exchange policy.</p>
        </Section>

        <Section title="SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION">
          <p>You agree to provide current, complete and accurate purchase and account information.</p>
        </Section>

        <Section title="SECTION 7 - OPTIONAL TOOLS">
          <p>Use of third-party tools provided is at your own risk.</p>
        </Section>

        <Section title="SECTION 8 - THIRD-PARTY LINKS">
          <p>We are not responsible for third-party websites or materials and recommend reviewing their policies.</p>
        </Section>

        <Section title="SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS">
          <p>We may use your submissions without restriction. You must not submit unlawful or offensive content.</p>
        </Section>

        <Section title="SECTION 10 - PERSONAL INFORMATION">
          <p>Your submission of personal information is governed by our .</p>
        </Section>

        <Section title="SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS">
          <p>We reserve the right to correct any errors or inaccuracies at any time without prior notice.</p>
        </Section>

        <Section title="SECTION 12 - PROHIBITED USES">
          <p>You are prohibited from using the site or its content for unlawful, harmful or abusive purposes.</p>
        </Section>

        <Section title="SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY">
          <p>Your use of the service is at your sole risk. We do not guarantee that the service will be error-free or uninterrupted.</p>
        </Section>

        <Section title="SECTION 14 - INDEMNIFICATION">
          <p>You agree to indemnify and hold Beyond East harmless from any claim arising from your breach of these Terms.</p>
        </Section>

        <Section title="SECTION 15 - SEVERABILITY">
          <p>If any part of the Terms is unlawful, the remainder will remain valid and enforceable.</p>
        </Section>

        <Section title="SECTION 16 - TERMINATION">
          <p>We may terminate these Terms at any time. You will remain liable for all outstanding amounts.</p>
        </Section>

        <Section title="SECTION 17 - ENTIRE AGREEMENT">
          <p>These Terms constitute the entire agreement between you and us.</p>
        </Section>

        <Section title="SECTION 18 - GOVERNING LAW">
          <p>These Terms are governed by the laws of Pakistan.</p>
        </Section>

        <Section title="SECTION 19 - CHANGES TO TERMS OF SERVICE">
          <p>We may update these Terms at any time. Continued use of the site implies acceptance of the changes.</p>
        </Section>

        <Section title="SECTION 20 - CONTACT INFORMATION">
          <p>If you have any questions about the Terms of Service, please contact us at <a href="mailto:info@beyondeast.com" className="underline text-blue-600">info@beyondeast.com</a>.</p>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
    <div className="text-lg font-medium text-gray-700 space-y-3">{children}</div>
  </div>
);

export default TermsOfService;
