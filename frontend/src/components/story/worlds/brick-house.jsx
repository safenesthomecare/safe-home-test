// Two-storey red-brick GTA colonial with centre gable, white trim and shutters, attached garage. Same door footprint as House (door 84 x 138, centred on x) so characters and camera keys still line up.
const TRIM = '#F6F1E7';

export function BrickColonial({ x, y, s = 1, lit = false, open = false, door = '#2E5A8A', brick = '#A5513B', roof = '#463F3B', garage = true, number = '24' }) {
  const glass = lit ? '#F7BE6E' : '#A9C4D8';
  const blinds = (cx, cy, w, h) => lit && [0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={cx - w / 2} y={cy + 6 + i * (h / 6.4)} width={w} height="2" fill="#B87333" opacity=".55" />);
  const Win = ({ cx, cy, w = 54, h = 78, arch = false, cols = 2, rows = 1 }) => (
    <g>
      <rect x={cx - w / 2 - 24} y={cy} width="15" height={h} fill={TRIM} /><rect x={cx + w / 2 + 9} y={cy} width="15" height={h} fill={TRIM} />
      <path d={[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `M${cx - w / 2 - 22} ${cy + 6 + i * (h / 8.2)}h11M${cx + w / 2 + 11} ${cy + 6 + i * (h / 8.2)}h11`).join('')} stroke="#C9C2B4" strokeWidth="1.5" />
      <rect x={cx - w / 2 - 4} y={cy - 4} width={w + 8} height={h + 8} rx="2" fill={TRIM} />
      {arch
        ? <path d={`M${cx - w / 2} ${cy + h}V${cy + w / 2}A${w / 2} ${w / 2} 0 0 1 ${cx + w / 2} ${cy + w / 2}V${cy + h}Z`} fill={glass} />
        : <rect x={cx - w / 2} y={cy} width={w} height={h} fill={glass} />}
      {blinds(cx, cy, w, h)}
      <path d={[...Array(cols - 1)].map((_, i) => `M${cx - w / 2 + ((i + 1) * w) / cols} ${cy}V${cy + h}`).join('') + (rows > 1 ? `M${cx - w / 2} ${cy + h / 2}H${cx + w / 2}` : '')} stroke={TRIM} strokeWidth="3" />
      <rect x={cx - w / 2 - 7} y={cy + h + 4} width={w + 14} height="6" fill="#8A4130" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <pattern id="bk-pat" width="28" height="16" patternUnits="userSpaceOnUse"><path d="M0 8H28M14 0V8M0 16H28M0 8V16" stroke="#6E3224" strokeWidth="1" opacity=".32" fill="none" /></pattern>
      </defs>
      <ellipse cx={garage ? 70 : 0} cy="4" rx={garage ? 340 : 250} ry="11" fill="#000" opacity=".16" />
      {/* main block */}
      <rect x="-210" y="-270" width="420" height="270" fill={brick} /><rect x="-210" y="-270" width="420" height="270" fill="url(#bk-pat)" />
      <rect x="-210" y="-16" width="420" height="16" fill="#8C867C" /><rect x="-210" y="-18" width="420" height="3" fill="#B9B3A8" />
      <rect x="-210" y="-170" width="420" height="6" fill="#8A4130" opacity=".7" />
      {/* hip roof + centre gable */}
      <path d="M-236 -266 L-176 -330 L176 -330 L236 -266Z" fill={roof} />
      <path d="M-236 -266 L-176 -330 L176 -330 L236 -266" fill="none" stroke="#2E2B2A" strokeWidth="3" opacity=".5" />
      <path d="M-100 -266 L0 -354 L100 -266Z" fill={brick} /><path d="M-100 -266 L0 -354 L100 -266Z" fill="url(#bk-pat)" />
      <path d="M-106 -266 L0 -360 L106 -266" fill="none" stroke={TRIM} strokeWidth="7" strokeLinejoin="round" />
      <path d="M-20 -282 A20 20 0 0 1 20 -282Z" fill={TRIM} /><path d="M-13 -284 A13 13 0 0 1 13 -284Z" fill={glass} />
      <rect x="-240" y="-270" width="480" height="8" fill={TRIM} /><rect x="-240" y="-262" width="480" height="3" fill="#000" opacity=".15" />
      {/* second floor */}
      <Win cx={-135} cy={-234} /><Win cx={0} cy={-234} arch /><Win cx={135} cy={-234} />
      {/* first floor */}
      <Win cx={-135} cy={-130} w={86} h={86} cols={3} /><Win cx={135} cy={-130} w={86} h={86} cols={3} />
      {/* entry */}
      <path d="M-68 -162 L0 -174 L68 -162Z" fill={TRIM} /><rect x="-68" y="-162" width="136" height="12" fill={TRIM} /><rect x="-60" y="-150" width="120" height="4" fill="#D8D2C4" />
      <rect x="-56" y="-150" width="112" height="150" fill={TRIM} /><rect x="-56" y="-150" width="8" height="150" fill="#E4DFD2" /><rect x="48" y="-150" width="8" height="150" fill="#E4DFD2" />
      {open ? (
        <g><rect x="-42" y="-138" width="84" height="138" fill="#F2A850" /><rect x="-42" y="-138" width="84" height="40" fill="#F7BE6E" /><rect x="-42" y="-40" width="84" height="40" fill="#C9822F" opacity=".5" /><path d="M42 -138 L42 0 L28 -4 L28 -132Z" fill="#F2EEE4" /></g>
      ) : (
        <g><rect x="-42" y="-138" width="84" height="138" fill={door} /><rect x="-30" y="-126" width="26" height="46" fill={lit ? '#FFD27A' : '#A9C4D8'} /><rect x="4" y="-126" width="26" height="46" fill={lit ? '#FFD27A' : '#A9C4D8'} /><rect x="-30" y="-72" width="26" height="56" fill="#000" opacity=".12" /><rect x="4" y="-72" width="26" height="56" fill="#000" opacity=".12" /><circle cx="34" cy="-66" r="3.5" fill="#E8C547" /></g>
      )}
      <rect x="-62" y="0" width="124" height="9" fill="#C9C2B6" stroke="#8A4130" strokeWidth="2.5" /><rect x="-74" y="9" width="148" height="9" fill="#B5AEA2" stroke="#8A4130" strokeWidth="2.5" />
      {[-54, -36, -18, 0, 18, 36, 54].map((k) => <path key={k} d={`M${k} 9V18`} stroke="#8A4130" strokeWidth="1.5" opacity=".6" />)}
      {/* lantern, house number, mail slot */}
      <rect x="-82" y="-118" width="10" height="16" rx="2" fill="#2B2B2B" />{lit && <circle cx="-77" cy="-110" r="22" fill="#FFC070" opacity=".35" />}<rect x="-80" y="-116" width="6" height="12" fill={lit ? '#FFE9A8' : '#C9D8E2'} />
      <ellipse cx="-77" cy="-80" rx="13" ry="9" fill={TRIM} stroke="#8A8276" strokeWidth="1" /><text x="-77" y="-76.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2B2B2B" fontFamily="Georgia, serif">{number}</text>
      <rect x="-90" y="-62" width="26" height="9" rx="1" fill="#1E1E1E" />
      {/* attached garage */}
      {garage && (
        <g>
          <rect x="210" y="-150" width="146" height="150" fill={brick} /><rect x="210" y="-150" width="146" height="150" fill="url(#bk-pat)" />
          <path d="M204 -148 L232 -186 L334 -186 L362 -148Z" fill={roof} /><rect x="204" y="-152" width="158" height="6" fill={TRIM} />
          <rect x="226" y="-108" width="114" height="108" fill="#F2F2EE" stroke="#D5D2CA" strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="226" y={-108 + i * 27} width="114" height="2.5" fill="#CFCCC3" />)}
          <rect x="344" y="-122" width="7" height="12" rx="1.5" fill="#2B2B2B" />{lit && <circle cx="347" cy="-116" r="18" fill="#FFC070" opacity=".3" />}
        </g>
      )}
    </g>
  );
}
