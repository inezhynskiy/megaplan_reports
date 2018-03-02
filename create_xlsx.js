'use strict';

const {concat} = require('lodash');
const XLSX = require('xlsx');
const {getTimePeriodStr, log} = require('./utils');


module.exports = function createXlsx(data, dtStart, dtEnd, outdir) {
  const SHEET_NAME = 'Лист 1';
  const wb = XLSX.utils.book_new();

  // Document properties
  wb.Props = {
    Title: "Отчёт из Мегаплана",
    Subject: "Стоимость работ / затраченное время, ресурсы",
    Author: "",
    CreatedDate: new Date()
  };

  // Init variables
  let lineNum = 0;
  const emplColProps = data.employees.map(e => ({title: e.name, width: 18}));
  let colProps = [
    {title: 'Проект', width: 25},
    {title: `Задачи за ${getTimePeriodStr(dtStart, dtEnd)}`, width: 44},
    {title: 'Затрач. время из карточки', width: 23},
    {title: 'Затраченное время', width: 17},
    {title: 'Запланированное время', width: 21},
    {title: 'Затрач/запланир.', width: 15}
  ];
  const COL_PROJ = 0;
  const COL_TASK = 1;
  const COL_WORK_FROM_CARD = 2;
  const COL_WORK = 3;
  const COL_WORK_PLANNED = 4;
  const COL_WORK_PLANNED_RATION = 5;
  const employeeColStart = colProps.length;
  colProps = concat(colProps, emplColProps);
  const cols = colProps.map(c => ({wch: c.width}));

  // Create worksheet
  wb.SheetNames.push(SHEET_NAME);
  wb.Sheets[SHEET_NAME] = {
    '!ref': 'A1:',
    '!cols': cols
  };
  const ws = wb.Sheets[SHEET_NAME];

  // Draw the header
  colProps.forEach((col, colInd) => {
    const cell = {
      t: "s",
      v: col.title,
      s: {
        font: {
          bold: true
        }
      }
    };

    drawCell(cell, ws, lineNum, colInd);
  });
  lineNum += 1;

  // Draw the data table's body
  const projects = data.projects;
  const employees = data.employees;
  projects.forEach(prj => {
    // Draw project line (totals)
    const projWorkFromCard = +prj.actual_work_with_sub_tasks;
    const projPlannedWork = +prj.planned_work;
    drawCell({t: 's', v: prj.name}, ws, lineNum, COL_PROJ);
    drawCell({t: 'n', z: '0', v: work2hours(projWorkFromCard)}, ws, lineNum, COL_WORK_FROM_CARD);
    drawCell({t: 'n', z: '0', v: work2hours(prj.totalWork)}, ws, lineNum, COL_WORK);
    drawCell({t: 'n', z: '0', v: work2hours(projPlannedWork)}, ws, lineNum, COL_WORK_PLANNED);
    if (projPlannedWork) {
      drawCell({t: 'n', z: '0.00', v: prj.totalWork / projPlannedWork}, ws, lineNum, COL_WORK_PLANNED_RATION);
    }
    // Draw employee's project work (total)
    employees.forEach((empl, emplInd) => {
      drawCell({t: 'n', z: '0', v: empl.proj2work.get(prj.id) || 0}, ws, lineNum, employeeColStart + emplInd);
    });

    lineNum += 1;
  });

  // Finalize the document (finalize ws)
  const lastColIndex = cols.length - 1;
  var endOfWsRange = XLSX.utils.encode_cell({c: lastColIndex, r: lineNum});
  ws['!ref'] += endOfWsRange;

  // Write report to file
  XLSX.writeFile(wb, `${outdir}\\test.xlsx`);
};

function drawCell(cell, ws, row, col) {
  const cellAddress = {c: col, r: row};
  const cellRef = XLSX.utils.encode_cell(cellAddress);
  ws[cellRef] = cell;
}

function work2hours(work) {
  if (!work) {
    return 0;
  }
  return work / 60;
}
