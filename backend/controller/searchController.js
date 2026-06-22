import Course from "../model/courseModel.js"

import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
dotenv.config()

export const searchWithAi = async (req,res) => {
    try {
        const {input} = req.body
        if(!input) {
            return res.status(400).json({message:"Search query is required"})
        }

     
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:
        -App Development
        -AI/ML
        -AI Tools
        -Data Science
        -Data Analytics
        -Ethical Hacking
        -Ui UX Designing
        -Web Development
        -Others
        -Beginner
        -Intermediate
        -Advanced

        Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.
        
        Query: ${input}`

        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
     });

     const keyword = response.text

        const courses = await Course.find({
            isPublished:true ,
            $text: { $search: input }
        });
        if(courses.length > 0 ){
            return res.status(200).json(courses)
        }
        else{
            const aiCourses = await Course.find({
            isPublished:true ,
            $text: { $search: keyword }
        });
        return res.status(200).json(aiCourses)
        }
        
    } catch (error) {
        return res.status(500).json({message:`failed to search ${error}`})
    }
}