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
