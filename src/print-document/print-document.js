import React from 'react';
import propTypes from 'prop-types';
import fs from 'file-saver';
import numberToLetters from './numberToLetters';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableCell, TableRow, WidthType } from "docx";
 
export default class CreateDocument extends React.Component {

    doc = new Document();

    static propTypes = {
        name: propTypes.string,
        position: propTypes.string,
        contractNumber: propTypes.string,
        contractStart: propTypes.string,
        multiplier: propTypes.number,
        lecturesHours: propTypes.any,
        seminarHours: propTypes.any,
        diplomaHours: propTypes.any,
        setsHours: propTypes.any,
        examsHours: propTypes.any,
        consultationHours: propTypes.any,
        otherHours: propTypes.any,
    };

    componentDidMount(){
        this.createDocument();
    };

    total = `${(this.props.lecturesHours*this.props.multiplier)+
            (this.props.seminarHours*this.props.multiplier)+
            (this.props.diplomaHours*this.props.multiplier)+
            (this.props.setsHours*this.props.multiplier)+
            (this.props.examsHours*this.props.multiplier)+
            (this.props.consultationHours*this.props.multiplier)+
            (this.props.otherHours*this.props.multiplier)}`

    createDocument = () => {
        this.doc.addSection({
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Дополнительное соглашение`,
                                bold: true,
                                font: 'Times New Roman',
                                size: 26,
                                heading: HeadingLevel.HEADING_2,
                            }),
                            
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `с преподавателем Томского государственного университета`,
                                bold: true,
                                font: 'Times New Roman',
                                size: 26,
                                heading: HeadingLevel.HEADING_2,
                            }),
                            
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(является дополнением и неотъемлемой частью трудового договора с преподавателем)",
                                font: 'Times New Roman',
                                size: 22
                            }), 
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "г.Томск\t\t\t\t\t\t\t\t\t\t         01 апреля 2019 г.",
                                italics: true,
                                font: 'Times New Roman',
                                size: 20,
                                leftToRight: true,
                            }), 
                        ],
                    }),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: (`\tФедеральное государственное автономное образовательное учреждения высшего образования «Национальный исследовательский Томский государственный университет» в лице начальника Отдела платных образовательных услуг Якимовой Юлии Александровны, действующей на основании доверенности №168 от 06.07.202_., и преподаватель ${this.props.name}, \r`),
                                font: 'Times New Roman',
                                size: 18
                            }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: {
                            line: 360
                        }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: (`именуемый в дальнейшем «Преподаватель» заключили дополнительные соглашения к трудовому договору с преподавателем `),
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: (`${this.props.contractNumber} `),
                                underline: true,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: (`от `),
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: (`${this.props.contractStart}г.`),
                                underline: true,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: (` в должности `),
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun ({
                                text: `${this.props.position}`,
                                bold: true,
                                underline: true,
                                font: 'Times New Roman',
                                size: 18,
                            }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: {
                            line: 360
                        }
                    }),
                    new Paragraph({
                        children:[
                            new TextRun({
                                text: 'факультет: ',
                                font: 'Times New Roman',
                                size: 18,
                            }),
                            new TextRun({
                                text: 'инновационных технологий',
                                font: 'Times New Roman',
                                size: 18,
                                bold: true,
                                underline: true,
                            }),
                            new TextRun({
                                text: ' о нижеследующем:',
                                font: 'Times New Roman',
                                size: 18,
                            }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: {
                            line: 360
                        }
                    }),
                    new Paragraph("\n"),
                    new Paragraph({
                        children:[
                            new TextRun({
                                text: '\tПункт 5 трудового договора дополнить подпунктом следующего содержания «Преподавателю устанав-ливается с ',
                                font: 'Times New Roman',
                                size: 18,
                            }),
                            new TextRun({
                                text: '01.04.2019 г.',
                                font: 'Times New Roman',
                                size: 18,
                                underline: true,
                            }),
                            new TextRun({
                                text: ' по ',
                                font: 'Times New Roman',
                                size: 18,
                            }),
                            new TextRun({
                                text: '30.04.2019 г.',
                                font: 'Times New Roman',
                                size: 18,
                                underline: true,
                            }),
                            new TextRun({
                                text: '  дополнительный объем учебной нагрузки по дисциплине ',
                                font: 'Times New Roman',
                                size: 18,
                            }),
                            new TextRun({
                                text: 'Infromation security:',
                                font: 'Times New Roman',
                                size: 18,
                                italics: true,
                                bold: true,
                                underline: true,
                            }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: {
                            line: 360
                        }
                    }),
                    new Paragraph("\n"),
                    this.createTable(),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: (`\tЗа дополнительный объем работы со студентами, обучающимися на платной основе на `),
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: (`факультете инновационных технологий,`),
                                underline: true,
                                italics: true,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: (` устанавливается единовременная доплата в размере ${this.total} `),
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: `${numberToLetters(this.total)}`,
                                underline: true,
                                italics: true,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: (` выплата, которая производится ежемесячно (ежеквартально, `),
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun ({
                                text: `единовременно)`,
                                underline: true,
                                font: 'Times New Roman',
                                size: 18,
                            }),
                            new TextRun({
                                text: (` в размере ${this.total} `),
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun ({
                                text: `${numberToLetters(this.total)}`,
                                underline: true,
                                italics: true,
                                font: 'Times New Roman',
                                size: 18,
                            }),
                            new TextRun({
                                text: (` в соответствии с утвержденным в ТГУ Порядком».`),
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: {
                            line: 360
                        }
                    }),
                    new Paragraph("\n"),
                    new Paragraph("\n"),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\t\t   ТГУ\t\t\t\t\t\t\t         Преподаватель",
                                font: 'Times New Roman',
                                size: 18
                            }), 
                        ],
                        alignment: AlignmentType.LEFT,
                    }),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${'_______________________________'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: "\t\t\t\t\t",
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: `${'_______________________________'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(подпись)",
                                font: 'Times New Roman',
                                size: 16,
                                italics: true
                            }), 
                            new TextRun({
                                text: "\t\t\t\t\t\t\t\t",
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: "(подпись)",
                                font: 'Times New Roman',
                                size: 16,
                                italics: true
                            }), 
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph("\n"),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "СОГЛАСОВАНО",
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                        ],
                        alignment: AlignmentType.LEFT,
                    }),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\tОПОУ\t\t",
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: `${'_____________________\t\t\t'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: `${'_____________________________________'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                        ],
                        alignment: AlignmentType.LEFT,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\t\t     (подпись, дата)",
                                font: 'Times New Roman',
                                size: 16,
                                italics: true
                            }), 
                            new TextRun({
                                text: "\t\t\t\t\t(расшифровка подписи)",
                                font: 'Times New Roman',
                                size: 16,
                                italics: true
                            }), 
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\tУП\t\t",
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: `${'_____________________\t\t\t'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: `${'_____________________________________'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                        ],
                        alignment: AlignmentType.LEFT,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\t\t     (подпись, дата)",
                                font: 'Times New Roman',
                                size: 16,
                                italics: true
                            }), 
                            new TextRun({
                                text: "\t\t\t\t\t(расшифровка подписи)",
                                font: 'Times New Roman',
                                size: 16,
                                italics: true
                            }), 
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph("\n"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\tРуководитель\t\t\t\t\t",
                                font: 'Times New Roman',
                                size: 18,
                            }),
                        ],
                        alignment: AlignmentType.LEFT,
                        spacing: {
                            line: 360
                        }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\tподразделения\t",
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: `${'_____________________\t\t\t'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: `${'___________'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                            new TextRun({
                                text: 'С.В. Шидловский',
                                font: 'Times New Roman',
                                size: 18,
                                underline: true
                            }), 
                            new TextRun({
                                text: `${'___________'}`,
                                font: 'Times New Roman',
                                size: 18,
                            }), 
                        ],
                        alignment: AlignmentType.LEFT,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\t\t     (подпись, дата)",
                                font: 'Times New Roman',
                                size: 16,
                                italics: true
                            }), 
                            new TextRun({
                                text: "\t\t\t\t\t(расшифровка подписи)",
                                font: 'Times New Roman',
                                size: 16,
                                italics: true
                            }), 
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                ]
        });
    }

    createTable = () => {
        return new Table({
            alignment: AlignmentType.RIGHT,
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Вид учебной нагрузки",
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 18,
                                            }),
                                        ],
                                    alignment: AlignmentType.CENTER,
                                })
                            ],
                            width: {
                                size: 51.9,
                                type: WidthType.PERCENTAGE,
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Стоимость",
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 18,
                                            }),
                                        ],
                                    alignment: AlignmentType.CENTER,
                                    }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "1часа/1работы",
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 18,
                                            }),
                                        ],
                                    alignment: AlignmentType.CENTER,
                                }),
                            ],
                            width: {
                                size: 18.4,
                                type: WidthType.PERCENTAGE,
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Кол-во",
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 18,
                                            }),
                                        ],
                                    alignment: AlignmentType.CENTER,
                                    }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "часов/работ",
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 18,
                                            }),
                                        ],
                                    alignment: AlignmentType.CENTER,
                                }),
                            ],
                            width: {
                                size: 15,
                                type: WidthType.PERCENTAGE,
                            },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Всего,",
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 18,
                                            }),
                                        ],
                                    alignment: AlignmentType.CENTER,
                                    }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "руб.",
                                            bold: true,
                                            font: 'Times New Roman',
                                            size: 18,
                                            }),
                                        ],
                                    alignment: AlignmentType.CENTER,
                                }),
                            ],
                            width: {
                                size: 14.5,
                                type: WidthType.PERCENTAGE,
                            },
                        }),
                    ],
                }),
                //2 строка
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  Лекции",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.lecturesHours === '' ? '' : this.props.multiplier}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.lecturesHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.lecturesHours === '' ? '' : this.props.multiplier*this.props.lecturesHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                    ],
                }),
                //3 строка
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  Семинарские (практические) занятия",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.seminarHours === '' ? '' : this.props.multiplier}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.seminarHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.seminarHours === '' ? '' : this.props.multiplier*this.props.seminarHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                    ],
                }),
                //4 строка
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  Руководство дипломными (курсовыми) работами",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.diplomaHours === '' ? '' : this.props.multiplier}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.diplomaHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.diplomaHours === '' ? '' : this.props.multiplier*this.props.diplomaHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                    ],
                }),
                //5 строка
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  Зачеты",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.setsHours === '' ? '' : this.props.multiplier}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.setsHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.setsHours === '' ? '' : this.props.multiplier*this.props.setsHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                    ],
                }),
                //6 строка
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  Экзамены",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.examsHours === '' ? '' : this.props.multiplier}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.examsHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.examsHours === '' ? '' : this.props.multiplier*this.props.examsHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                    ],
                }),
                //7 строка
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  Консультации",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.consultationHours === '' ? '' : this.props.multiplier}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.consultationHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.consultationHours === '' ? '' : this.props.multiplier*this.props.consultationHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                    ],
                }),
                //8 строка
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  Другая учебная работа",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.otherHours === '' ? '' : this.props.multiplier}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.otherHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.props.otherHours === '' ? '' : this.props.multiplier*this.props.otherHours}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                    ],
                }),
                //9 строка
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  ВСЕГО",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  ",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "  ",
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `  ${this.total}`,
                                            font: 'Times New Roman',
                                            size: 18,
                                            })
                                        ],
                                    alignment: AlignmentType.LEFT,
                                })
                            ],
                        }),
                    ],
                }),
            ],
            width: {
                size: 94.6,
                type: WidthType.PERCENTAGE,
            },
        });
    }

    printDocument = () => {
        Packer.toBlob(this.doc)
            .then((blob) => {
                fs.saveAs(blob, 'example.docx')
            });
    }

    
    render(){
        return (
            <div>
                <button className="btn btn-primary" 
                        onClick={this.printDocument}>
                        Создать отчёт
                </button>
            </div>
        );
    };
};
