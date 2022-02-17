import React, {useEffect, useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale, setDefaultLocale } from  "react-datepicker"
import ru from 'date-fns/locale/ru'
import {AuthContext} from "../context/AuthContext"
registerLocale('ru', ru)
setDefaultLocale('ru')

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const [startDate, setStartDate] = useState(new Date())
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div>
            <h1 className="center-align">Вес сегодня</h1>
            <h5 className="center-align">Выберите Дату</h5>
            <div className = 'center-align'><DatePicker className = 'center-align' locale="ru" selected={startDate} onChange={date => setStartDate(date)}
            /></div>
            <h5 className="center-align">Введите свой Вес</h5>
            <input
                placeholder="Введите вес"
                id="link"
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
                onKeyPress={pressHandler}
            />
            <label htmlFor="link">Введите вес</label>
        </div>
    )
}