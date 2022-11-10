const cols = document.querySelectorAll('.col'); 

// RGB
// #FF0000 Красный
// #00FF00 Зеленый 
// #0000FF Синий 

document.addEventListener('keydown', (event) => {
    event.preventDefault(); 
    if (event.code.toLocaleLowerCase() === 'space') { 
        setRandomColors(); 
    }
}); 

document.addEventListener('click', (event) => { 
    const type = event.target.dataset.type; 

    if (type === 'lock') { 
        const node = 
        event.target.tagName.toLowerCase() === 'i'
            ? event.target 
            : event.target.children[0]; 

    node.classList.toggle('fa-lock-open'); 
    node.classList.toggle('fa-lock'); 
    } else if (type === 'copy') { 
        copyToClickdoard(event.target.textContent); 
    } 
}); 

// document.addEventListener('touchstart', event  => { 
//     if (event.code.toLocaleLowerCase() === 'touch') { 
//         setRandomColors(); 
//     }
// }); 

function generateRandomColors() { 
    const hexCodes = '0123456789ABCDEF'; //Все значения потенц входящие в цвет
    let color = '';
    for (let i = 0; i < 6; i++) { 
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]; //Генератор рандомных цветов
        //Обращаемся к хексКодес и прописываем матан. 
    }
    return '#' + color; 
}

function copyToClickdoard(text) { 
    return navigator.clipboard.writeText(text); 
}

function setRandomColors(isInitial) { 
    const colors = isInitial ? getColorsFromHash() : []; 
    
    cols.forEach((col, index)=> { 
        const isLocked = col.querySelector('i').classList.contains('fa-lock'); 
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if(isLocked) { 
            colors.push(text.textContent); 
            return; 
        }

        const color = isInitial 
        ? colors[index] 
          ? colors[index]
          : generateRandomColors()
        : generateRandomColors(); 

        if(!isInitial) {
            colors.push(color);
        }
        
        text.textContent = color; 
        col.style.background = color;

        setTextColor(text, color);
        setTextColor(button, color);
    });  

    updateColorsHash(colors); 
}

function setTextColor(text, color) { 
   const luminance = chroma(color).luminance(); 
   text.style.color = luminance > 0.5 ? 'black' : 'white'; 

}

function updateColorsHash(colors = []) { 
    document.location.hash = colors.map(col => { 
        return col.substring(1); 
    }).join('-'); 
}

function getColorsFromHash() { 
    if (document.location.hash.length > 1) { 
        return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => '#' + color); 
    }
    return []; 
}
setRandomColors(true); 