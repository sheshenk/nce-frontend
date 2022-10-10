import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/navigation/AppContainer/AppContainer";
import { AUTH_TOKEN } from "./constants/authToken";
import AssetsPage from "./pages/AssetsPage/AssetsPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import SymbolPage from "./pages/SymbolPage/SymbolPage";
import TradesPage from "./pages/TradesPage/TradesPage";
import VizPage from "./pages/VizPage/VizPage";
import { CURRENT_USER } from "./queries/auth";

import FearGreedData from "./pages/VizPage/DataAPI/FearGreedData";
import FearGreedImage from "./pages/VizPage/DataAPI/FearGreedImage";
import GlobalCapData from "./pages/VizPage/DataAPI/TotalCap";
import DeFi from "./pages/VizPage/DataAPI/DeFi";
import TrendingCoinData from "./pages/VizPage/DataAPI/TrendingNow";
import Top10CoinData from "./pages/VizPage/DataAPI/TopCoins";
import ContestPage from "./pages/ContestPage/ContestPage";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import NewsPage from "./pages/NewsPage/NewsPage";

export default function App() {

  const { loading, error, data } = useQuery(CURRENT_USER)
  const [user, setUser] = useState(undefined)

  const logout = () => {
    setUser(undefined)
    localStorage.removeItem(AUTH_TOKEN)
    window.location.replace("/")
  }

  const props = {
    user: user,
    logout: logout
  }

  useEffect(() => {
    if (loading) console.log('Loading user...')
    else if (error) setUser(null)
    else setUser(data.currentUser)
  }, [loading, error, data])

  if (user === undefined) return <></>
  if (!user) return <AuthPage />

  return (
    <AppContainer {...props}>
      <Routes>
        <Route path="/" element={<TradesPage {...props} />} />
        <Route path="/trade/:code" element={<SymbolPage {...props} />} />
        <Route path="/assets" element={<AssetsPage props={props} />} />
        <Route path="/blog" element={<BlogPage {...props} />} />
        <Route path="/viz" element={<VizPage {...props} />} >
          <Route path="/viz/fear_greed_data" element={<FearGreedData {...props} />} />
          <Route path="/viz/fear_greed_image" element={<FearGreedImage {...props} />} />
          <Route path="/viz/total_cap" element={<GlobalCapData {...props} />} />
          <Route path="/viz/defi" element={<DeFi {...props} />} />
          <Route path="/viz/top_coins" element={<Top10CoinData {...props} />} />
          <Route path="/viz/trending_coins" element={<TrendingCoinData {...props} />} />
        </Route>
        <Route path="/contest" >
          <Route path="/contest" element={<ContestPage />} />
          <Route path="/contest/:id" element={<LeaderboardPage />} />
        </Route>
        <Route path="/news" element={<NewsPage {...props} />} />
      </Routes>
    </AppContainer>
  );
}
