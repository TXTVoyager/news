import React from "react";
import NavBarNew from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getToken } from "../../../helper/Session";
import {topLogoTor} from "../../../assets/index";


const featuredEnabled = false;
const AboutDetails = () => {
  const isLoggedIn = getToken();
  const featuredLogos = [
    { img: "src/assets/AllImage/ProductsandSales/Products/src/assets/AllImage/ProductsandSales/Products/book-reflections-hope-by-asad.png", name: "Business Standard", link: "https://github.com/txtasad" },
  ]
  return (
    <>
      {<NavBarNew />}
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 trams-condition-page">
            <h2>About</h2>
            <p className="trams-title">TXTVIEWS</p>
            <p className="text-center"><img src={topLogoTor} alt="Logo TXTVIEWS" width={155} /></p>

            <div className="trams-condition-text-area">
              <div>
                <p><strong>TXTVIEWS NEWS</strong></p>

                <p>
                  TXTVIEWS NEWS is a next-generation news and insights platform dedicated to the dynamic worlds of technology, artificial intelligence, and finance. Our mission is to inform, inspire, and empower a global audience of professionals, innovators, and curious minds through timely reporting, expert analysis, and thought-provoking commentary.

                  We cover the stories that shape the future  -  from breakthrough AI research and evolving financial markets to startup innovation and digital transformation. Alongside our daily news coverage, we feature blogs and opinion pieces from industry leaders, researchers, and practitioners, offering deeper insights into the trends driving change across sectors.

                  In addition to our editorial content, we also offer guest publishing opportunities, expert interviews, media collaborations, advertorials, and a dedicated sponsored content section  -  all aimed at amplifying the voices and ideas shaping the future of technology and finance.

                  Whether you're a tech enthusiast, fintech professional, AI researcher, or simply someone navigating the future of business and innovation, TXTVIEWS NEWS brings you the context and clarity to stay ahead.
                </p>

                <hr />


                <section id="company-overview">

                  <div>
                    <p><strong>Business Description - TXTVIEWS (txtviews.com)</strong></p>
                    <p><em>Innovating the Future: Empowering Content, AI, and Digital Commerce.</em></p>
                  </div>

                  <div>
                    <p><strong>TXTVIEWS</strong> is a multi-platform digital technology company at the forefront of innovation across content, artificial intelligence, and e-commerce. We serve a diverse global audience of creators, consumers, and innovators through three complementary business verticals:</p>
                  </div>

                  <div>
                    <p><strong>TXTVIEWS News - Media & Insights</strong><br />
                      📰 Our flagship news platform delivers timely, expert coverage and in-depth analysis of technology, artificial intelligence, and finance. Through a dynamic mix of daily news, featured blogs, and sponsored content, we empower professionals, researchers, and enthusiasts with the knowledge and insights needed to navigate an ever-evolving digital landscape.</p>
                  </div>

                  <div>
                    <p><strong>TXTVIEWS AI</strong><br />
                      🤖 TXTVIEWS AI is a cutting-edge content creation platform that enables users to effortlessly generate high-quality voiceovers, images, written materials, and chatbot interactions. Powered by leading AI models such as GPT-4, DALL·E, and Whisper and driven by our proprietary CEMAFusion Engine, TXTVIEWS AI offers unparalleled model flexibility and seamless multi-model comparisons  -  all accessible within a single, intuitive dashboard. Designed to streamline content production for creators, marketers, educators, and businesses, this platform lowers barriers and accelerates AI-driven creativity at scale.</p>
                  </div>

                  <div>
                    <p><strong>TXTVIEWS Store - Digital Commerce</strong><br />
                      🛒 Our secure digital storefront offers a curated range of digital products and services designed to meet the evolving needs of modern consumers. Operating on a transparent, pay-per-product model, we ensure fast and reliable delivery through secure digital channels. With plans to expand our offerings to include licensed digital content such as eBooks and online courses, we strive to provide a versatile, trustworthy marketplace for a broad spectrum of digital assets and experiences.</p>
                  </div>
                </section>

                <footer>
                  <p>© 2025 TXTVIEWS. All rights reserved.</p>
                </footer>

                <hr />

                <section>
                  <div>
                    <p><strong>Intellectual Property and Copyright Disclaimers</strong><br />
                      ⚠️ Any trademarks, service marks, logos, or brand names mentioned or displayed on our platforms are the property of their respective owners.
                      These trademarks are used solely for informational and identification purposes, and no infringement or endorsement is intended or implied by TXTVIEWS NEWS, TXTVIEWS.com, or TXTVIEWS AI.
                    </p>

                    <p>
                      📜 The digital products and services offered through our platforms respect all applicable copyright, trademark, and licensing agreements.
                      We take necessary steps to ensure that our offerings comply with rights holders’ policies if any concerns are brought to our attention.
                    </p>

                    <p>
                      🛠️ Our AI content generation tools operate within the scope of fair use and applicable AI content guidelines.
                      Users are responsible for ensuring that their use of generated content complies with all relevant intellectual property rights and legal standards.
                    </p>
                  </div>
                </section>
              </div>

              <button>Thanks for visiting txtviews.com</button>
            </div>
          </div>
        </div>

        <div className="row">
          {featuredEnabled && featuredLogos.map((val, i) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 m-15px-tb"
              key={i}
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay={val.delayAnimation}
            >
              <div className="feature-box-featured d-flex row">
                <div className="iconfs col-7">
                  <a href={val.link} target="_blank">
                    <img
                      width={155}
                      height={65}
                      style={{ height: "fit-content", backgroundColor: i == 5 ? "rgba(176, 180, 205, 0.6)" : "" }}
                      src={`${val.img}`}
                      alt="media logo"
                    />
                  </a>
                </div>
                <div className="col-1"></div>
                <div className="media-body col-4">
                  <p>{val.name}</p>
                </div>
              </div>

            </div>
            // End .col
          ))}
        </div>

      </div>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};

export default AboutDetails;
