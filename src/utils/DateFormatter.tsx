export const formatDate = (date: Date): string => {
    const mes = date.toLocaleString('pt-BR', { month: 'long' });
    const ano = date.toLocaleString('pt-BR', { year: 'numeric' });
    return `${mes}/${ano}`;
};

export const createDateFromMes = (mes: string): Date | null => {
    const meses = {
        'janeiro': 1,
        'fevereiro': 2,
        'março': 3,
        'abril': 4,
        'maio': 5,
        'junho': 6,
        'julho': 7,
        'agosto': 8,
        'setembro': 9,
        'outubro': 10,
        'novembro': 11,
        'dezembro': 12,
    };

    const [monthString, yearString] = mes.split('/');
    const month = meses[monthString.toLowerCase()]; // Convert monthString to lowercase for case insensitivity
    const year = parseInt(yearString, 10);

    if (!isNaN(year) && meses.hasOwnProperty(monthString.toLowerCase())) {
        return new Date(year, month, 1);
    }

    return null; // Return null if parsing fails
};
