import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../redux/slices/user";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";

// TODO: Write guide content
const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  topic: {
    marginTop: "70px",
  },
  subtopic: {
    marginTop: "50px",
  },
  paragraph: {
    marginTop: "20px",
  },
  tableOfContents: {
    position: "fixed",
  },
  list: {
    listStyle: "none",
  },
  navigationText: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
    "&:active": {
      color: theme.palette.secondary.main,
    },
  },
  linkText: {
    textDecoration: "underline",
    color: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.primary.light,
    },
    "&:active": {
      color: theme.palette.secondary.light,
    },
  },
}));

export default function Guide() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useSelector(userSelector);

  if (!user.authenticated) {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={10}>
            <Grid item xs={9}>
              <div>
                <article>
                  <section>
                    <Typography variant="h1">Preface</Typography>

                    <Typography className={classes.paragraph} variant="body1">
                      Lots of websites already provide a ton more information
                      than we ever could here. With that said, plenty of
                      prerequisites and prior knowledges are required before one
                      could read the myriad of resources scattered on the
                      internet. Therefore, the intention of this guide is not to
                      be a complete resources that covers every details.
                      Instead, this guide will provide a very brief,
                      easy-to-understand introduction to stock trading and
                      investment. The information provided here is inspired,
                      referenced, and taken from many other websites in an
                      attempt to put together a short compilation of essential
                      information for beginners. Any suggestions are very much
                      welcome. Happy Reading!
                    </Typography>

                    <Typography className={classes.paragraph} variant="body1">
                      P.S. If you&apos;re already familiar with stock investing,
                      you can skip to{" "}
                      <a
                        className={classes.linkText}
                        href="#paper_trading_with_visutrader"
                      >
                        Part 2
                      </a>{" "}
                      to learn how to use VisuTrader.
                    </Typography>
                  </section>

                  <section>
                    {/* Empty padding */}
                    <Typography id="before_you_begin">‎</Typography>

                    <Typography className={classes.topic} variant="h1">
                      Part 1 Before You Start Begin
                    </Typography>

                    <section>
                      {/* Empty padding */}
                      <Typography id="why_should_I_consider_investing">
                        ‎
                      </Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        Why should I consider investing?
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Before diving too deep into the discussion of stocks or
                        trading, first we have to understand the motivation
                        behind it. Think about what happen to your money when
                        you store it. By default, your money loses it value over
                        time. This is caused by something called inflation, a
                        situation where the purchasing power of your currency
                        decreases and the prices of goods increase. For a more
                        detailed explanation, visit{" "}
                        <a
                          className={classes.linkText}
                          href="https://www.investopedia.com/terms/i/inflation.asp"
                        >
                          here
                        </a>
                        . For most developed countries, inflation is generally
                        around 2%, which means that stuffs cost about 2% more
                        every year than the year it did before. For example, in
                        the 70s, a cup of coffee cost about 50 cents, probably
                        less. But now a cup of coffee usually cost about $1 or
                        $2. So if you were to store $1000 under your bed or
                        something, then for the next 5 or 10 years time your
                        $1000 would not be worth $1000 anymore because
                        everything would have increase in price by about 2% each
                        year. This is not a good situation because the value of
                        your money fallen over time. Even if you were to store
                        your money in a bank for example, which usually has an
                        interest rate of about 0.5%, you would still loses your
                        money because inflation rate is higher.
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Of course, there are also many other reasons for why
                        people start investing, but inflation is usually the
                        main reason. With all that said, how do we actually make
                        money from investment? Well, imagine a hypothetical
                        savings account that gives us a 10% interest rate each
                        year. So if you initially have $1000, then in 10 years
                        time your money will have become roughly $2600. If we
                        adjust for inflation, you would still have about $2100.
                        This is obviously very good since we have more than
                        doubled our money by just putting it in a hypothetical
                        saving account. Unfortunately, this hypothetical 10%
                        interest rate saving account doesn&apos;t really exist
                        in real life, because the value is just way too high and
                        unrealistic. So what other options do we have to save
                        our money?
                      </Typography>
                    </section>

                    <section>
                      {/* Empty padding */}
                      <Typography id="what_is_investing">‎</Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        What is investing?
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Investing is the act of putting your money into various
                        financial instruments (in this guide, we&apos;ll be
                        focusing on stocks) in the hopes of that instrument
                        increasing in value, thus providing you with a profit.
                        This allows you to generate a separate income outside of
                        your job that can be used later in life. When you invest
                        in stocks, you are hoping that the values of various
                        companies increase (or the value of the entire market,
                        depending on what you invest in) which then increases
                        the value of your investment, allowing you to later sell
                        these investments for more money than you bought them.
                      </Typography>
                    </section>

                    <section>
                      {/* Empty padding */}
                      <Typography id="what_is_a_stock">‎</Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        What is a stock?
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        A stock represents a public company traded on an
                        exchange. These may be companies like Apple, Tesla, or
                        other smaller companies. When you buy a stock, you are
                        buying &quot;shares&quot; within the company. These
                        shares technically make you a part-owner of the company,
                        but usually at a very insignificant level. For example,
                        a company may have 500 million available shares. So if
                        you buy 100 shares, you own 0.00002% of that company.
                        Each share has a price that is determined by the stock
                        market and over time these shares either increase or
                        decrease in value depending on the performance or value
                        of the company.
                      </Typography>
                    </section>

                    <section>
                      {/* Empty padding */}
                      <Typography id="what_is_trading">‎</Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        What is trading?
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Technically speaking, all forms of transactions in the
                        stock market are trades. In the stock market,
                        &quot;trading&quot; usually refers to a specific type of
                        behavior, which is short-term speculation. Traders
                        usually seek to profit on fluctuations in price that
                        take place within one day, many days, many weeks, or
                        even many months, but often not many years unless one is
                        a long-term investor. These trades are often driven by
                        events like company earnings/financial announcements,
                        important company news, general market condition, or
                        advanced technical analysis of the stock. Trading is
                        usually a complex and risky endeavor that one should
                        only pursue after having a solid understanding of the
                        fundamentals of the market.
                      </Typography>
                    </section>

                    <section>
                      {/* Empty padding */}
                      <Typography id="but_how_do_I_buy_a_share_in_the_first_place">
                        ‎
                      </Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        But how do I buy a share in the first place?
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Let&apos;s say you want to buy a share from Apple, it is
                        not as simple as going to{" "}
                        <a className={classes.linkText} href="http://apple.com">
                          apple.com
                        </a>{" "}
                        and just click &quot;buy share&quot; or whatever.
                        Instead, you have to go through what&apos;s called a
                        broker. In the old days, a stockbroker was a physical
                        person that receives orders from clients to buy/shell
                        shares. Nowadays, you can make an account on an online
                        broker instead and buy company shares through that.
                        There are often fees associated with brokers (i.e.,
                        commissions), and each broker can provide you different
                        features and benefits that may be more or less suited to
                        your investment plans. It is best to first learn about
                        how brokers work at the{" "}
                        <a
                          className={classes.linkText}
                          href="https://www.investopedia.com/investing/complete-guide-choosing-online-stock-broker/"
                        >
                          Investopedia guide to brokers
                        </a>
                        . However, do keep in mind that every country has
                        different brokers and rules that you must abide to.
                      </Typography>
                    </section>

                    <section>
                      {/* Empty padding */}
                      <Typography id="understanding_market_capitalization">
                        ‎
                      </Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        Understanding Market Capitalization
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        You can determine the value of a company (and thus the
                        value of its stock) in several ways. The easiest way is
                        to look at the company&apos;s market value, also known
                        as market capitalization (or market cap). Calculating
                        market cap is pretty simple; for example, if a company
                        has 20 million shares outstanding and its share price is
                        $10, then the market cap is $200 million. In the stock
                        market, the size of a company is measured by its market
                        cap. Here are the basic stock categories of market
                        capitalization:
                        <ul>
                          <li>
                            <strong>Nano cap (less than $50 million)</strong>
                            <div>
                              Nano cap is as small as you can get in terms of
                              market capitalization. Nano caps are very risky
                              because they are such small companies and are
                              particularly prone to manipulation. Nano cap
                              stocks are also often referred to as penny stocks.
                            </div>
                          </li>

                          <li>
                            <strong>
                              Micro cap ($50 million to $300 million)
                            </strong>
                            <div>
                              Micro caps are known for their volatility, and as
                              such, tend to be considered riskier (although not
                              as risky as nano caps) than companies with larger
                              market capitalization.
                            </div>
                          </li>

                          <li>
                            <strong>
                              Small cap ($300 million to $2 billion)
                            </strong>
                            <div>
                              The definition for small cap varies among
                              brokerages, but they are generally companies with
                              $300 million to $2 billion in market cap. These
                              stocks fare better than the micro caps and still
                              have plenty of growth opportunities.
                            </div>
                          </li>

                          <li>
                            <strong>Mid cap ($2 billion to $10 billion)</strong>
                            <div>
                              For many investors, this category offers a good
                              compromise between small caps and large caps.
                              These stocks have some of the safety of large caps
                              while retaining some of the growth potential of
                              small caps.
                            </div>
                          </li>

                          <li>
                            <strong>
                              Large cap ($10 billion to $200 billion)
                            </strong>
                            <div>
                              This category is usually best reserved for
                              conservative stock investors who want steady
                              appreciation with greater safety. Stocks in this
                              category are frequently referred to as &quot;blue
                              chips&quot;.
                            </div>
                          </li>

                          <li>
                            <strong>Mega cap (more than $200 billion)</strong>
                            <div>
                              Refer to companies that are the biggest of the
                              big. Companies such as Apple or Amazon are an
                              example of this.
                            </div>
                          </li>
                        </ul>
                        From a safety point of view, a company&apos;s size and
                        market value do matter. In general, large cap stocks are
                        considered safer than small cap stocks. However, small
                        cap stocks have greater potential for growth. Although
                        market cap is an important factor to consider, one must
                        not invest based solely on it as there are other
                        important factors as well.
                      </Typography>
                    </section>

                    <section></section>
                  </section>

                  <section>
                    {/* Empty padding */}
                    <Typography id="paper_trading_with_visutrader">
                      ‎
                    </Typography>

                    <Typography className={classes.topic} variant="h1">
                      Part 2 Paper Trading with VisuTrader
                    </Typography>

                    <section></section>
                  </section>

                  <section>
                    {/* Empty padding */}
                    <Typography id="resources">‎</Typography>

                    <Typography className={classes.topic} variant="h1">
                      Part 3 Resources
                    </Typography>

                    <section>
                      {/* Empty padding */}
                      <Typography id="getting_started">‎</Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        Getting started
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        Self-learn courses for beginners.
                        <ul>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.investopedia.com/investing-4427685"
                            >
                              Investopedia University
                            </a>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.khanacademy.org/economics-finance-domain/core-finance/stock-and-bonds"
                            >
                              Khan Academy guide to stocks and bonds
                            </a>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.khanacademy.org/economics-finance-domain/core-finance/investment-vehicles-tutorial"
                            >
                              Khan Academy guide to other investment vehicles
                              and retirement plans
                            </a>
                          </li>
                        </ul>
                      </Typography>
                    </section>

                    <section>
                      {/* Empty padding */}
                      <Typography id="relevant_websites">‎</Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        Relevant websites
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        <ul>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.investopedia.com/"
                            >
                              Investopedia
                            </a>
                            <div>General knowledge platform</div>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.finviz.com/"
                            >
                              Finviz
                            </a>
                            <div>
                              Charts, technical data, patterns, and scanners
                            </div>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.tradingview.com/"
                            >
                              TradingView
                            </a>
                            <div>
                              Free, real-time streaming charts and many
                              technical analysis tools
                            </div>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.marketwatch.com/"
                            >
                              MarketWatch
                            </a>
                            <div>
                              Great source for market related news and
                              information
                            </div>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.bloomberg.com/live/"
                            >
                              Bloomberg live streaming
                            </a>
                            <div>
                              Free live streaming news alternative to CNBC, and
                              depending on your preference, a better news
                              source. Either way if you have access to CNBC,
                              then you can stream both CNBC & Bloomberg on your
                              computer and switch to the one of your choice.
                            </div>
                          </li>
                        </ul>
                      </Typography>
                    </section>

                    <section>
                      {/* Empty padding */}
                      <Typography id="relevant_posts">‎</Typography>

                      <Typography className={classes.subtopic} variant="h2">
                        Relevant posts
                      </Typography>

                      <Typography className={classes.paragraph} variant="body1">
                        <ul>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.reddit.com/r/Daytrading/wiki/book-recommendations"
                            >
                              Day Trading Books
                            </a>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.reddit.com/r/investing/comments/9y490a/what_are_the_best_investing_books_for_beginners/"
                            >
                              Books on Investing
                            </a>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.bogleheads.org/RecommendedReading.php"
                            >
                              Bogleheads&apos; suggested readings
                            </a>
                          </li>
                          <li>
                            <a
                              className={classes.linkText}
                              href="https://www.reddit.com/r/stocks/comments/403usr/finance_and_wall_street_movies_dramas_and/"
                            >
                              Finance and Wall Street movies, dramas, and
                              documentaries
                            </a>
                          </li>
                        </ul>
                      </Typography>
                    </section>
                  </section>
                </article>
              </div>
            </Grid>

            <Grid item xs={3}>
              <div className={classes.tableOfContents}>
                <aside>
                  <h2>TABLE OF CONTENTS</h2>
                  <nav>
                    <ul className={classes.list}>
                      <li>
                        <h3>
                          <a
                            className={classes.navigationText}
                            href="#before_you_begin"
                          >
                            Part 1 Before You Begin
                          </a>
                        </h3>

                        <ul>
                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#why_should_I_consider_investing"
                              >
                                Why should I consider Investing?
                              </a>
                            </h4>
                          </li>

                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#what_is_investing"
                              >
                                What is investing?
                              </a>
                            </h4>
                          </li>

                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#what_is_a_stock"
                              >
                                What is a stock?
                              </a>
                            </h4>
                          </li>

                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#what_is_trading"
                              >
                                What is trading?
                              </a>
                            </h4>
                          </li>

                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#but_how_do_I_buy_a_share_in_the_first_place"
                              >
                                But how do I buy a share in the first place?
                              </a>
                            </h4>
                          </li>

                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#understanding_market_capitalization"
                              >
                                Understanding Market Capitalization
                              </a>
                            </h4>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <h3>
                          <a
                            className={classes.navigationText}
                            href="#paper_trading_with_visutrader"
                          >
                            Part 2 Paper Trading with VisuTrader
                          </a>
                        </h3>

                        <ul></ul>
                      </li>

                      <li>
                        <h3>
                          <a
                            className={classes.navigationText}
                            href="#resources"
                          >
                            Part 3 Resources
                          </a>
                        </h3>

                        <ul>
                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#getting_started"
                              >
                                Getting Started
                              </a>
                            </h4>
                          </li>

                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#relevant_websites"
                              >
                                Relevant websites
                              </a>
                            </h4>
                          </li>

                          <li>
                            <h4>
                              <a
                                className={classes.navigationText}
                                href="#relevant_posts"
                              >
                                Relevant posts
                              </a>
                            </h4>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </aside>
              </div>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  } else {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Typography variant="h3" align="center">
              Sign up to unlock this feature
            </Typography>
          </Box>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  }
}
