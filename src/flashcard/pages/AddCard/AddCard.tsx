import { Box, Button } from "@mui/material"
import { DEFAULT_CARDS } from "../../../shared/constants/global"
import { useState } from "react"
import TitleCard from "../../components/TitleCard"
import TermCard from "../../components/TermCard"


const AddCard = () => {
    const [totalCards, setTotalCards] = useState<number[]>(DEFAULT_CARDS)

    const handleAddMoreCard = () => {
        const copyCards = [...totalCards]
        copyCards.push(copyCards.length + 1)
        console.log(copyCards)
        setTotalCards(copyCards)
    }

    const handleRemoveCard = (id: number) => {
      const copyCards = [...totalCards].filter((card, index) => index !== id-1)
      console.log(copyCards)
      setTotalCards(copyCards)
    }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TitleCard />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {
                totalCards.map((card, index) => <TermCard key={index} handleRemoveCard={handleRemoveCard} id={index+1}/>)
            }
            <Button type="button" onClick={handleAddMoreCard}>Add</Button>
        </Box>
        <Button type="submit">Create</Button>
    </Box>
  )
}

export default AddCard