import {React, useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  const [category, setCategory] = useState('All')
  const [menu,setMenu] = useState(false)
  return (
    <div>
      <Header setMenu={setMenu}/>
      {menu && <ExploreMenu category = {category} setCategory = {setCategory} />}
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home