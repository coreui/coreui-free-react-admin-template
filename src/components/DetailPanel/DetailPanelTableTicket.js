/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Card,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { CCol, CRow } from '@coreui/react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const DetailPanelTableTicket = ({ rowData }) => {
  const [summaryFocus, setSummaryFocus] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUpdateTicket = (rowData) => {
    console.log('update ticket', rowData)
    setSummaryFocus(false)
    setLoading(true)
  }

  function jiraToHtml(text) {
    // Échappement de base
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // Couleur {color:#xxxxxx}
    text = text.replace(
      /\{color:(#[0-9a-fA-F]{6})\}([\s\S]*?)\{color\}/g,
      (_, color, content) => `<span style="color:${color}">${content}</span>`,
    )

    // Gras *texte*
    text = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>')

    // Italique _texte_
    text = text.replace(/_(.*?)_/g, '<em>$1</em>')

    // Souligné +texte+
    text = text.replace(/\+(.*?)\+/g, '<u>$1</u>')

    // Barré -texte-
    text = text.replace(/-(.*?)-/g, '<del>$1</del>')

    // Monospace ~texte~
    text = text.replace(/~(.*?)~/g, '<code>$1</code>')

    // Exposant ^texte^
    text = text.replace(/\^(.*?)\^/g, '<sup>$1</sup>')

    // Lien [texte|url]
    text = text.replace(/\[(.+?)\|(.+?)\]/g, `<a href="$2" target="_blank">$1</a>`)

    // Mention [~accountid:xxxxx] → nom générique
    text = text.replace(/\[~accountid:[a-zA-Z0-9]*\]/g, `<span class="mention">@utilisateur</span>`)

    // Listes à puces *
    text = text.replace(/(^|\n)\* (.*?)(?=\n|$)/g, '$1<ul><li>$2</li></ul>')
    text = text.replace(/<\/ul>\s*<ul>/g, '') // merge lists

    // Listes numérotées #
    text = text.replace(/(^|\n)# (.*?)(?=\n|$)/g, '$1<ol><li>$2</li></ol>')
    text = text.replace(/<\/ol>\s*<ol>/g, '') // merge lists

    // Tableaux
    // En-tête ||header||header||
    text = text.replace(/\|\|(.+?)\|\|/g, (_, headers) => {
      const cols = headers
        .split('||')
        .filter(Boolean)
        .map((h) => `<th>${h.trim()}</th>`)
        .join('')
      return `<table><thead><tr>${cols}</tr></thead><tbody>`
    })

    // Lignes |col|col|
    text = text.replace(/\n\|(.+?)\|/g, (_, row) => {
      const cols = row
        .split('|')
        .map((c) => `<td>${c.trim()}</td>`)
        .join('')
      return `<tr>${cols}</tr>`
    })

    // Fin de tableau
    text = text.replace(/<\/tbody>(?!<\/table>)/g, '</tbody></table>')

    // Bloc {noformat}
    text = text.replace(/\{noformat\}([\s\S]*?)\{noformat\}/g, '<pre>$1</pre>')

    // Retour à la ligne double
    text = text.replace(/\n{2,}/g, '<br/><br/>')

    return text
  }
  const classes = useStyles()

  return (
    <div className="px-5 py-3 bg-white">
      <div className="row">
        <div className="col-8">
          <TextField
            id="rowData.fields.summary"
            variant="standard"
            fullWidth
            onFocus={() => setSummaryFocus(true)}
            onBlur={() => handleUpdateTicket()}
            value={rowData.fields.summary}
            InputProps={{
              disableUnderline: true,
              style: {
                border: 'none',
                fontWeight: 'bold',
              },
            }}
          />
          <div className="p-3">
            <strong className="pb-3 fs-6">Description</strong>
            <div dangerouslySetInnerHTML={{ __html: jiraToHtml(rowData.fields.description) }} />
          </div>
        </div>
        <div className="col-4">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Détails</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Personne assignée</strong>
                <strong>{rowData.fields.assignee.displayName}</strong>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      {/* {parseJiraMarkup(rowData.fields.description)}
      <TextField value={rowData.fields.description} /> */}
    </div>
  )
}

export default DetailPanelTableTicket
