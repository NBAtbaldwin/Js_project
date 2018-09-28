export const getSoundIdx = (beat) => {
  const drumSoundIdxList = []
  const row = document.getElementById(`row-${beat}`);
  const arr = Array.from(row.childNodes);
  arr.forEach((node, idx) => {
    if (Array.from(node.classList).join('').includes("selected")) {
      drumSoundIdxList.push(idx);
    }
  });
  return drumSoundIdxList;
}

export const hightlightBeat = (beat) => {
  const row = document.getElementById(`row-${beat}`);
  const arr = Array.from(row.childNodes);
  arr.forEach((node, idx) => {
    node.classList.add('on-beat');
  });
}

export const unHighlightBeat = (beat) => {
  let beatAlias;
  beat === 0 ? beatAlias = 32 : beatAlias = beat;
  const row = document.getElementById(`row-${beatAlias - 1}`);
  const arr = Array.from(row.childNodes);
  arr.forEach((node, idx) => {
    node.classList.remove('on-beat');
  });
}

export const unHighlightLastBeat = (beat) => {
  const row = document.getElementById(`row-${beat+1}`);
  const arr = Array.from(row.childNodes);
  arr.forEach((node, idx) => {
    node.classList.remove('on-beat');
  });
  console.log('hey');
}

export const clearScene = () => {
  const master = document.getElementById("sequencer-master");
  const rows = master.childNodes;
  rows.forEach((row, rowIdx) => {
    row.childNodes.forEach((col, colIdx) => {
      col.classList.remove('on-beat');
    })
  })
}
