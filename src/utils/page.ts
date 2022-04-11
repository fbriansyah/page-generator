import {arrayToFields, convertFieldToArray} from './form';

function headersToArray(headers: THeader[]){
  return headers.map(header => [header.type, header.label])
}

function arrayToHeaders(arrHeader: any[]){
  return arrHeader.map(v => ({
    type: v[0],
    label: v[1]
  }))
}

export function pageToArray(pageSetting: TPageSetting) {
  const newPage = [
    pageSetting.endpoint,
    pageSetting.title,
    pageSetting.description,
    headersToArray(pageSetting.headers),
    convertFieldToArray(pageSetting.filter),
    pageSetting.editor,
  ]
  return newPage;
}

export function arrayToPage(arrPage: any[]) {
  const [end, title, description, headers, filter, editor] = arrPage
  const _pageSetting: TPageSetting = {
    endpoint: end,
    title,
    description,
    headers: arrayToHeaders(headers),
    filter: arrayToFields(filter),
    editor
  }
  return _pageSetting;
}