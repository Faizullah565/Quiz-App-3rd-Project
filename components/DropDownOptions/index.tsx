'use client';
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useQuiz from '@/app/store';
import { Check, ChevronDown, Circle } from "lucide-react"

type CategoryType = {
    id: number;
    name: string;
}

const Type = ['boolean', 'multiple']
const Level = ['easy', 'medium', 'hard']

function DropOptions() {
    const [categories, setCategory] = useState<CategoryType[]>([])
    const addLevel = useQuiz((state:any) => state.addLevel)
    const addType = useQuiz((state:any) => state.addType)
    const addCategory = useQuiz((state:any) => state.addCategory)
    const config = useQuiz((state:any) => state.config)
    // const addStatus=useQuiz(state=>state.addStatus)

    useEffect(() => {
        async function fetchCategory() {
            const { trivia_categories } = await (await fetch("https://opentdb.com/api_category.php")).json()
            setCategory([...trivia_categories])
        }
        fetchCategory()
    }, [])
    return (
        <div className='w-full'>
            <section className='flex justify-evenly items-center py-5 w-full'>
                <div className='px-7 py-4 w-1/3 mx-4 '>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex outline-none justify-between w-full shadow-lg px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-gray-100'>{config.category.name ? config.category.name : "CATEGORY"}<ChevronDown /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select Category </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {categories.map(category => <DropdownMenuItem key={category.id} onClick={() => addCategory(category.id, category.name)} >{category.name}</DropdownMenuItem>
                            )
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <div className='px-7 py-4 w-1/3 mx-4 '>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex outline-none justify-between w-full shadow-lg px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-gray-100'>{config.level ? config.level : "SELECT LEVEL"}<ChevronDown /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select Level</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                Level.map(e => <DropdownMenuItem onClick={() => addLevel(e)} key={e}>{e}</DropdownMenuItem>)
                            }


                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='px-7 py-4 w-1/3 mx-4 '>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex outline-none justify-between w-full shadow-lg px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-gray-100'>{config.type ? config.type : "SELECT TYPE"}<ChevronDown /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Slelect Type</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                Type.map(e => <DropdownMenuItem onClick={() => addType(e)} key={e}>{e}</DropdownMenuItem>)
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </section>
        </div>
    )
}

export default DropOptions
