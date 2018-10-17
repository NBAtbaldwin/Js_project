class Tutorial {
  constructor() {

  }

  initialize() {
    this.dir1Listeners();
    const modal = document.getElementsByClassName("modal")[0];
    modal.classList.remove("hidden");
    const directions1 = document.getElementById("directions-1");
    directions1.classList.remove("hidden");
    this.dir2Listeners();
    this.dir3Listeners();
  }

  dir1Listeners() {
    document.getElementById("exit-1").addEventListener('click', () => {
      document.getElementsByClassName("modal")[0].classList.add("hidden");
      document.getElementById("directions-1").classList.add("hidden");
    });
    document.getElementById("next-1").addEventListener('click', () => {
      document.getElementById("directions-1").classList.add("hidden");      document.getElementById("directions-2").classList.remove("hidden");
    });
  }

  dir2Listeners() {
    document.getElementById("exit-2").addEventListener('click', () => {
      document.getElementsByClassName("modal")[0].classList.add("hidden");
      document.getElementById("directions-2").classList.add("hidden");
    });
    document.getElementById("next-2").addEventListener('click', () => {
      document.getElementById("directions-2").classList.add("hidden");      document.getElementById("directions-3").classList.remove("hidden");
    });
    document.getElementById("back-2").addEventListener('click', () => {
      document.getElementById("directions-2").classList.add("hidden");      document.getElementById("directions-1").classList.remove("hidden");
    });
  }

  dir3Listeners() {
    document.getElementById("exit-3").addEventListener('click', () => {
      document.getElementsByClassName("modal")[0].classList.add("hidden");
      document.getElementById("directions-3").classList.add("hidden");
    });

    document.getElementById("back-3").addEventListener('click', () => {
      document.getElementById("directions-3").classList.add("hidden");      document.getElementById("directions-2").classList.remove("hidden");
    });
  }

}

export default Tutorial;
