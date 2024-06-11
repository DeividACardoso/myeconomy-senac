export const formatDate = (date: Date): string => {
    const data = new Date(date);
    const mes = data.toLocaleString('pt-BR', { month: 'long' });
    const ano = data.toLocaleString('pt-BR', { year: 'numeric' });
    return mes + '/' + ano;
}

export const createDateFromMes = (mes: string): Date => {
    const [monthString, yearString] = mes.split('/');
    const meses = {
        'janeiro': 0,
        'fevereiro': 1,
        'março': 2,
        'abril': 3,
        'maio': 4,
        'junho': 5,
        'julho': 6,
        'agosto': 7,
        'setembro': 8,
        'outubro': 9,
        'novembro': 10,
        'dezembro': 11,
    };
    const month = meses[monthString];
    const year = parseInt(yearString, 10);
    const date = new Date(year, month, 1);
    return date;
}