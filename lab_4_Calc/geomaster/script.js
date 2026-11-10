'use strict';

const PI = Math.PI;

const heron = (a, b, c) => {
  const p = (a + b + c) / 2;
  return Math.sqrt(p * (p - a) * (p - b) * (p - c));
};

const SHAPES = {
  square: {
    n: 'Квадрат',
    d: 2,
    f: [['a', 'Сторона a']],
    check: ({ a }) => {
      if (a > 1e5) return ['a', 'Сторона слишком велика (максимум 100 000)'];
      return null;
    },
    calc: ({ a }) => [
      ['Периметр P', 4 * a, 1],
      ['Площадь S', a * a, 2],
      ['Диагональ', a * Math.SQRT2, 1, 1]
    ]
  },
  rectangle: {
    n: 'Прямоугольник',
    d: 2,
    f: [['a', 'Сторона a'], ['b', 'Сторона b']],
    check: ({ a, b }) => {
      if (a > 1e5) return ['a', 'Сторона a слишком велика'];
      if (b > 1e5) return ['b', 'Сторона b слишком велика'];
      return null;
    },
    calc: ({ a, b }) => [
      ['Периметр P', 2 * (a + b), 1],
      ['Площадь S', a * b, 2],
      ['Диагональ', Math.hypot(a, b), 1, 1]
    ]
  },
  triangle: {
    n: 'Треугольник',
    d: 2,
    f: [['a', 'Сторона a'], ['b', 'Сторона b'], ['c', 'Сторона c']],
    check: ({ a, b, c }) => {
      if (a >= b + c) return ['a', 'Сторона a должна быть меньше суммы двух других сторон'];
      if (b >= a + c) return ['b', 'Сторона b должна быть меньше суммы двух других сторон'];
      if (c >= a + b) return ['c', 'Сторона c должна быть меньше суммы двух других сторон'];
      return null;
    },
    calc: ({ a, b, c }) => [
      ['Периметр P', a + b + c, 1],
      ['Площадь S (формула Герона)', heron(a, b, c), 2]
    ]
  },
  parallelogram: {
    n: 'Параллелограмм',
    d: 2,
    f: [['a', 'Основание a'], ['b', 'Боковая сторона b'], ['h', 'Высота h (к стороне a)']],
    check: ({ a, b, h }) => {
      if (h > a) return ['h', 'Высота не может быть больше основания a'];
      if (h > b) return ['h', 'Высота не может быть больше боковой стороны b'];
      return null;
    },
    calc: ({ a, b, h }) => [
      ['Периметр P', 2 * (a + b), 1],
      ['Площадь S', a * h, 2]
    ]
  },
  trapezoid: {
    n: 'Трапеция',
    d: 2,
    f: [['a', 'Основание a'], ['b', 'Основание b'], ['c', 'Боковая сторона c'], ['d', 'Боковая сторона d']],
    check: ({ a, b, c, d }) => {
      if (a === b) return ['b', 'Основания равны — это параллелограмм. Сделайте основания разными'];
      const p = Math.abs(a - b);
      if (c >= p + d) return ['c', 'Сторона c слишком велика: c должно быть меньше |a−b| + d'];
      if (d >= p + c) return ['d', 'Сторона d слишком велика: d должно быть меньше |a−b| + c'];
      if (p >= c + d) {
        const guilty = a > b ? 'a' : 'b';
        return [guilty, 'Разность оснований слишком велика для заданных боковых сторон'];
      }
      return null;
    },
    calc: ({ a, b, c, d }) => {
      const h = 2 * heron(Math.abs(a - b), c, d) / Math.abs(a - b);
      return [
        ['Периметр P', a + b + c + d, 1],
        ['Площадь S', (a + b) / 2 * h, 2],
        ['Высота h (вычислена)', h, 1, 1]
      ];
    }
  },
  rhombus: {
    n: 'Ромб',
    d: 2,
    f: [['d1', 'Диагональ d₁'], ['d2', 'Диагональ d₂']],
    check: ({ d1, d2 }) => {
      if (d1 === d2) return ['d1', 'Если диагонали равны, это квадрат. Сделайте d₁ ≠ d₂'];
      return null;
    },
    calc: ({ d1, d2 }) => {
      const a = Math.hypot(d1, d2) / 2;
      return [
        ['Периметр P', 4 * a, 1],
        ['Площадь S', d1 * d2 / 2, 2],
        ['Сторона a (вычислена)', a, 1, 1]
      ];
    }
  },
  ellipse: {
    n: 'Эллипс',
    d: 2,
    f: [['a', 'Большая полуось a'], ['b', 'Малая полуось b']],
    check: ({ a, b }) => {
      if (a === b) return ['a', 'Если полуоси равны, это окружность. Сделайте a > b'];
      if (a < b) return ['a', 'Большая полуось a должна быть больше малой полуоси b'];
      return null;
    },
    calc: ({ a, b }) => {
      const h = ((a - b) / (a + b)) ** 2;
      return [
        ['Периметр P (приближённо)', PI * (a + b) * (1 + 3 * h / (10 + Math.sqrt(4 - 3 * h))), 1],
        ['Площадь S', PI * a * b, 2]
      ];
    }
  },
  cube: {
    n: 'Куб',
    d: 3,
    f: [['a', 'Ребро a']],
    check: ({ a }) => {
      if (a ** 3 > 1e15) return ['a', 'Объём слишком велик'];
      return null;
    },
    calc: ({ a }) => [
      ['Сумма длин рёбер', 12 * a, 1],
      ['Площадь поверхности S', 6 * a * a, 2],
      ['Объём V', a ** 3, 3]
    ]
  },
  box: {
    n: 'Параллелепипед',
    d: 3,
    f: [['a', 'Длина a'], ['b', 'Ширина b'], ['c', 'Высота c']],
    check: ({ a, b, c }) => {
      if (a * b * c > 1e15) return ['a', 'Объём слишком велик'];
      return null;
    },
    calc: ({ a, b, c }) => [
      ['Сумма длин рёбер', 4 * (a + b + c), 1],
      ['Площадь поверхности S', 2 * (a * b + b * c + a * c), 2],
      ['Объём V', a * b * c, 3]
    ]
  },
  cone: {
    n: 'Конус',
    d: 3,
    f: [['r', 'Радиус основания r'], ['h', 'Высота h']],
    check: ({ r, h }) => {
      if (Math.hypot(r, h) > 1e5) return ['h', 'Образующая слишком велика'];
      return null;
    },
    calc: ({ r, h }) => {
      const l = Math.hypot(r, h);
      return [
        ['Длина окружности основания', 2 * PI * r, 1],
        ['Площадь поверхности S', PI * r * (r + l), 2],
        ['Объём V', PI * r * r * h / 3, 3],
        ['Образующая l (вычислена)', l, 1, 1]
      ];
    }
  },
  pyramid: {
    n: 'Пирамида',
    d: 3,
    f: [['a', 'Сторона основания a'], ['h', 'Высота h']],
    check: ({ a, h }) => {
      if (a ** 2 * h > 1e15) return ['a', 'Объём слишком велик'];
      return null;
    },
    calc: ({ a, h }) => {
      const l = Math.hypot(h, a / 2);
      return [
        ['Сумма длин рёбер', 4 * a + 4 * Math.sqrt(h * h + a * a / 2), 1],
        ['Площадь поверхности S', a * a + 2 * a * l, 2],
        ['Объём V', a * a * h / 3, 3]
      ];
    }
  },
  cylinder: {
    n: 'Цилиндр',
    d: 3,
    f: [['r', 'Радиус основания r'], ['h', 'Высота h']],
    check: ({ r, h }) => {
      if (PI * r * r * h > 1e15) return ['r', 'Объём слишком велик'];
      return null;
    },
    calc: ({ r, h }) => [
      ['Длина окружности основания', 2 * PI * r, 1],
      ['Площадь поверхности S', 2 * PI * r * (r + h), 2],
      ['Объём V', PI * r * r * h, 3]
    ]
  },
  sphere: {
    n: 'Шар',
    d: 3,
    f: [['r', 'Радиус r']],
    check: ({ r }) => {
      if (4 / 3 * PI * r ** 3 > 1e15) return ['r', 'Объём слишком велик'];
      return null;
    },
    calc: ({ r }) => [
      ['Длина большой окружности', 2 * PI * r, 1],
      ['Площадь поверхности S', 4 * PI * r * r, 2],
      ['Объём V', 4 / 3 * PI * r ** 3, 3]
    ]
  }
};

const $ = id => document.getElementById(id);
const sup = { 1: '', 2: '²', 3: '³' };
let dim = '2';
let cur = 'square';

const fmt = x => x.toLocaleString('ru-RU', { maximumFractionDigits: 4 });

function renderShapes() {
  $('shapes').innerHTML = '';
  Object.entries(SHAPES)
    .filter(([, s]) => String(s.d) === dim)
    .forEach(([k, s]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'shape';
      b.setAttribute('role', 'listitem');
      b.setAttribute('aria-pressed', k === cur);
      b.innerHTML = `<img src="images/${k}.svg" alt=""><span>${s.n}</span>`;
      b.onclick = () => select(k);
      $('shapes').appendChild(b);
    });
}

function select(k) {
  cur = k;
  const s = SHAPES[k];
  $('title').textContent = s.n;
  $('pic').src = `images/${k}.svg`;
  $('pic').alt = `Чертёж: ${s.n}`;
  
  $('fields').innerHTML = s.f.map(([id, label]) => `
    <div class="field" id="f-${id}">
      <label for="${id}">${label}</label>
      <div class="inp">
        <input id="${id}" type="number" inputmode="decimal" step="any" min="0" placeholder="Введите число">
        <span class="u"></span>
      </div>
      <div class="err" role="alert"></div>
    </div>`).join('');
    
  updateUnits();
  $('result').hidden = true;
  renderShapes();
}

function updateUnits() {
  document.querySelectorAll('.u').forEach(e => {
    e.textContent = $('unit').value;
  });
}

function setErr(id, msg) {
  const f = $('f-' + id);
  if (f) {
    f.classList.toggle('bad', !!msg);
    f.querySelector('.err').textContent = msg || '';
  }
}

function showFail(msg) {
  const r = $('result');
  r.hidden = false;
  r.className = 'card result fail';
  r.textContent = msg;
}

$('form').addEventListener('submit', e => {
  e.preventDefault();
  const s = SHAPES[cur];
  const v = {};
  let ok = true;
  let first = null;

  s.f.forEach(([id]) => {
    const raw = $(id).value.trim().replace(',', '.');
    const n = Number(raw);
    let m = '';
    if (raw === '') m = 'Введите значение';
    else if (!isFinite(n)) m = 'Это не число';
    else if (n <= 0) m = 'Значение должно быть больше нуля';
    else if (n > 1e6) m = 'Слишком большое значение (максимум 1 000 000)';
    
    setErr(id, m);
    if (m) { ok = false; first = first || id; }
    else v[id] = n;
  });

  if (!ok) {
    $(first).focus();
    showFail('Проверьте поля, выделенные красным.');
    return;
  }

  if (s.check) {
    const c = s.check(v);
    if (c) {
      setErr(c[0], c[1]);
      $(c[0]).focus();
      showFail(c[1]);
      return;
    }
  }

  const u = $('unit').value;
  const r = $('result');
  r.hidden = false;
  r.className = 'card result';
  r.innerHTML = `<h3>Результат: ${s.n}</h3>` +
    s.calc(v).map(([l, x, p, sub]) =>
      `<div class="res${sub ? ' sub' : ''}"><span>${l}</span><b>${fmt(x)} ${u}${sup[p]}</b></div>`).join('');
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

$('form').addEventListener('reset', () => {
  SHAPES[cur].f.forEach(([id]) => setErr(id, ''));
  $('result').hidden = true;
});

$('unit').addEventListener('change', () => {
  updateUnits();
  $('result').hidden = true;
});

document.querySelectorAll('.seg button').forEach(b => {
  b.onclick = () => {
    dim = b.dataset.dim;
    document.querySelectorAll('.seg button').forEach(x => {
      x.setAttribute('aria-selected', x === b);
    });
    select(dim === '2' ? 'square' : 'cube');
  };
});

select('square');