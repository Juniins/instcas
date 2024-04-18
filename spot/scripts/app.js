let CurrentMusic = 0;

const music = document.querySelector("#audio");
const saleSound = document.querySelector("#salesound");

const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");

const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const likeBtn = document.querySelector(".like");
const notlikeBtn = document.querySelector(".not-like");
const oldDisk = document.querySelector(".old-disk");
const content = document.querySelector(".content");
const contentVsl = document.querySelector(".content-vsl");
const headline = document.querySelector(".headline");

//
//
// Adiciona evento que escuta o fim da reprodução do áudio
music.addEventListener("ended", function () {
  playBtn.classList.add("pause");
});

// Notificações JS
// Após exibir a notificação

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";

  const checkIcon = document.getElementById("checkIcon").cloneNode(true);
  checkIcon.style.display = "block";
  notification.appendChild(checkIcon);

  const text = document.createElement("div");
  text.className = "notification-message";
  text.textContent = message;
  notification.appendChild(text);

  const notifications = document.querySelectorAll(".notification");
  notifications.forEach((n) => {
    n.style.transition = "transform 1s cubic-bezier(0.21, 1.02, 0.73, 1)";
  });

  let verticalOffset = 0;
  notifications.forEach((n) => {
    n.style.transform = `translate3d(0, ${verticalOffset}px, 0)`;
    verticalOffset += n.offsetHeight + 8;
  });

  const container = document.getElementById("notificationContainer");
  container.insertBefore(notification, container.firstChild);

  notification.style.transform = `translate3d(0, ${verticalOffset}px, 0)`;
  notification.style.animation =
    "slideIn 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards";

  notification.addEventListener("click", () => {
    notification.style.animation =
      "slideOut 0.5s cubic-bezier(0.15, 0.69, 0.33, 1.75) 0s 1 normal forwards";

    notification.addEventListener("animationend", () => {
      notification.remove();
    });
  });

  setTimeout(() => {
    notification.style.animation =
      "slideOut 0.5s cubic-bezier(0.15, 0.69, 0.33, 1.75) 0s 1 normal forwards";

    notification.addEventListener("animationend", () => {
      notification.remove();
    });
  }, 2000);

  setTimeout(() => {
    checkIcon.style.transform = "scale(1)";
  }, 10);
}

// FUNÇÃO SPLASH
// Espera até que o conteúdo da página esteja totalmente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os elementos com as classes splash-screen e container-logo
  let splashScreen = document.querySelector(".splash-screen");
  let containerLogo = document.querySelector(".container-logo");

  // Verifica se os elementos existem
  if (splashScreen && containerLogo) {
    // Adiciona a classe "anim-popup" à splash-screen após um atraso de 1000ms
    setTimeout(function () {
      splashScreen.classList.add("opacity-0");

      // Adiciona a classe "opacity-0" ao container-logo após um atraso de 400ms
      setTimeout(function () {
        containerLogo.classList.add("opacity-0");
      }, 400);

      // Adiciona display: none à splash-screen após um atraso adicional de 2000ms
      setTimeout(function () {
        splashScreen.style.display = "none";
      }, 400);
    }, 1000);
  }
});

// FUNÇÃO BTN INIT
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os elementos com as classes popup1, popups, play-btn e rate-section
  let popup1 = document.querySelector(".popup1");
  let popups = document.querySelector(".popups");
  let btnInit = document.querySelector(".btn-init");
  let playBtn = document.querySelector(".play-btn");
  let rateSection = document.querySelector(".rate-section");
  let balanceSpan = document.querySelector(".balance span");

  // Verifica se os elementos existem
  if (popup1 && popups && btnInit && playBtn && rateSection && balanceSpan) {
    // Adiciona um event listener ao botão btn-init
    btnInit.addEventListener("click", function () {
      // Adiciona display: none ao elemento com a classe popup1
      popup1.style.display = "none";
      // Adiciona a classe "opacity-0" ao elemento com a classe popups
      popups.classList.add("opacity-0");

      // Define o estilo display: none ao elemento com a classe popups após um pequeno atraso
      setTimeout(function () {
        popups.style.display = "none";
      }, 500); // Ajuste o tempo conforme necessário

      // Remove a classe "pause" do elemento com a classe play-btn
      playBtn.classList.remove("pause");

      // Executa a função music.play(); (substitua "music" pelo objeto do seu player de música)
      music.play();

      // Adiciona a transformação scale(1) ao elemento com a classe rate-section
      rateSection.style.transform = "scale(1)";
      // Adiciona a transição ao elemento com a classe rate-section
      rateSection.style.transition =
        "transform 0.5s cubic-bezier(0, 0.6, 0, 1.02) 0s";

      // Atualiza o saldo gradualmente para $33.82
      updateBalanceSmoothly(25.82);
    });
  }
});

// Função para atualizar o saldo suavemente
const updateBalanceSmoothly = (targetValue) => {
  const balanceSpan = document.querySelector(".balance span");
  if (balanceSpan) {
    // Valor atual do saldo
    let currentValue = parseFloat(balanceSpan.textContent);
    // Calcula a diferença entre o valor atual e o valor alvo
    let difference = targetValue - currentValue;
    // Número de etapas para a animação
    let steps = 20;
    // Intervalo de tempo entre as etapas (em milissegundos)
    let interval = 1;
    // Calcula o valor de incremento para cada etapa
    let increment = difference / steps;
    // Inicia a atualização gradual do saldo
    let counter = 0;
    let timer = setInterval(() => {
      currentValue += increment;
      balanceSpan.textContent = currentValue.toFixed(2);
      counter++;
      // Verifica se todas as etapas foram concluídas
      if (counter >= steps) {
        clearInterval(timer);
        balanceSpan.textContent = targetValue.toFixed(2); // Garante que o valor final seja exibido corretamente

        // Após a atualização do saldo, chama a função de notificação
        showNotification("Thank you for participating! You won $25.82!"); // Aqui você pode personalizar a mensagem da notificação conforme necessário
        saleSound.play();
      }
    }, interval);
  }
};

//
//
// Exibir Popup 2

//
//
// playBtn.addEventListener("click", () => {
//   if (playBtn.className.includes("pause")) {
//     music.play();
//   } else {
//     music.pause();
//   }
//   playBtn.classList.toggle("pause");
// });

// setup music
const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.style.backgroundImage = `url('${song.cover}')`;

  currentTime.innerHTML = "0:00";
  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration - music.currentTime);
  }, 300);
};

setMusic(0);

// Formating time in min and seconds format

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

// seek bar
setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);

  // Calcular tempo restante
  const remainingTime = music.duration - music.currentTime;
  musicDuration.innerHTML = formatTime(remainingTime);
}, 1000);

// seek bar
seekBar.addEventListener("input", () => {
  music.currentTime = seekBar.value;
  currentTime.innerHTML = formatTime(seekBar.value);
  const remainingTime = music.duration - seekBar.value;
  musicDuration.innerHTML = formatTime(remainingTime);
});

// Like & Not like
// Event listener para o botão de "like"
likeBtn.addEventListener("click", () => {
  if (
    !likeBtn.classList.contains("step3") &&
    !notlikeBtn.classList.contains("step3")
  ) {
    // Verifica se nenhum dos botões possui a classe "step3"
    // Avança para a próxima música apenas se não houver a classe "step3"
    if (currentMusic === songs.length - 1) {
      currentMusic = 0;
    } else {
      currentMusic++;
    }
    setMusic(currentMusic);
    music.play();
    playBtn.classList.remove("pause");
  } else {
    playBtn.classList.add("pause"); // Adiciona a classe "pause" ao playBtn
    if (!music.paused) {
      music.pause(); // Pausa a música apenas se não estiver pausada
    }
  }
  // Chama a função para atualizar o saldo com um valor aleatório entre 8 e 10
  updateBalanceValue();
});

// Event listener para o botão de "not-like"
notlikeBtn.addEventListener("click", () => {
  if (
    !likeBtn.classList.contains("step3") &&
    !notlikeBtn.classList.contains("step3")
  ) {
    // Verifica se nenhum dos botões possui a classe "step3"
    // Avança para a próxima música apenas se não houver a classe "step3"
    if (currentMusic === songs.length - 1) {
      currentMusic = 0;
    } else {
      currentMusic++;
    }
    setMusic(currentMusic);
    music.play();
    playBtn.classList.remove("pause");
  } else {
    playBtn.classList.add("pause"); // Adiciona a classe "pause" ao playBtn
    if (!music.paused) {
      music.pause(); // Pausa a música apenas se não estiver pausada
    }
  }
  // Chama a função para atualizar o saldo com um valor aleatório entre 8 e 10
  updateBalanceValue();
});

// Função para atualizar o saldo suavemente
const updateBalanceValue = () => {
  const balanceSpan = document.querySelector(".balance span");
  if (balanceSpan) {
    // Valor atual do saldo
    let currentValue = parseFloat(balanceSpan.textContent);
    // Calcula o valor necessário para atingir ou se aproximar de 69.27
    let targetValue = 69.27 - currentValue;
    // Limita o valor adicionado entre 8 e 10
    let valueAdded = Math.min(Math.random() * 2 + 5, targetValue);
    // Calcula o novo saldo
    let newBalance = currentValue + valueAdded;
    // Atualiza o texto do saldo na interface
    balanceSpan.textContent = newBalance.toFixed(2);

    // Retorna o valor adicionado para exibir na notificação
    return valueAdded;
  }
};

// Animação disks
// Event listener para o botão de "like"
likeBtn.addEventListener("click", animateDisk);

// Event listener para o botão de "not-like"
notlikeBtn.addEventListener("click", animateDisk);

function animateDisk() {
  // Verifica se algum dos botões possui a classe "step3"
  if (
    likeBtn.classList.contains("step3") ||
    notlikeBtn.classList.contains("step3")
  ) {
    // Sai da função se algum botão tiver a classe "step3"
    return;
  }

  // Altera o background e a opacidade do old-disk

  // Animação do old-disk
  oldDisk.style.opacity = "1";
  setTimeout(() => {
    oldDisk.style.transition = "transform 0.4s ease-in-out";
    oldDisk.style.transform = "translateX(-250%)";
  }, 210);

  setTimeout(() => {
    // Define a imagem do old-disk com base no array disks
    setTimeout(() => {
      oldDisk.style.backgroundImage = `url('${
        disks[currentMusic % disks.length].thumb
      }')`;
    }, 500); // Atraso de 200 milissegundos antes de trocar o background

    disk.style.transition = "none";
    disk.style.transform = "translateX(250%)";

    setTimeout(() => {
      disk.style.transition = "transform 0.4s ease-in-out";
      disk.style.transform = "translateX(0)";

      setTimeout(() => {
        oldDisk.style.opacity = "0";
        oldDisk.style.transform = "translateX(0)";
      }, 400);
    }, 50);
  }, 50);
}
//
//
// ANIMAÇÃO DA SEÇÃO RATE
const rateSection = document.querySelector(".rate-section");
const popups = document.querySelector(".popups");
const popup2 = document.querySelector(".popup2");
const finalValue = document.querySelector(".final-value"); // Seleciona o elemento .final-value

const startValue = 49.82; // Define o valor inicial
const endValue = 69.27; // Define o valor final

const animateValue = (start, end, duration) => {
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = timestamp - startTimestamp;
    const increment = (end - start) * (progress / duration);
    finalValue.textContent = (start + increment).toFixed(2);

    if (progress < duration) {
      requestAnimationFrame(step);
    } else {
      finalValue.textContent = end.toFixed(2);
    }
  };

  requestAnimationFrame(step);
};

const animateScale = () => {
  // Verifica se algum dos botões possui a classe "step3"
  if (
    likeBtn.classList.contains("step3") ||
    notlikeBtn.classList.contains("step3")
  ) {
    // Sai da função se algum botão tiver a classe "step3"
    rateSection.style.transition = "none";
    rateSection.style.transform = "scale(0)";
    playBtn.classList.add("pause"); // Adiciona a classe "pause" ao playBtn
    // Remove a classe "opacity-0" do elemento com a classe "popups"
    popups.style.display = "flex";
    popups.classList.remove("opacity-0");
    popup2.style.display = "flex";

    // Adiciona um pequeno atraso antes de remover a classe "anim-popup" do elemento popup2
    setTimeout(() => {
      popup2.classList.remove("anim-popup");
    }, 100); // Delay de 100 milissegundos

    if (!music.paused) {
      // Verifica se a música não está pausada
      music.pause(); // Pausa a música apenas se não estiver pausada
    }

    // Inicia a animação de valor apenas se algum botão tiver a classe "step3"
    animateValue(startValue, endValue, 1000); // Inicia a animação com duração de 1000ms (1 segundo)

    return;
  }

  // Remove qualquer transição e aplica escala 0 com um pequeno delay de 100ms
  rateSection.style.transition = "none"; // Remove transições temporariamente
  rateSection.style.transform = "scale(0)"; // Define o scale para 0 imediatamente

  // Usamos requestAnimationFrame para sincronizar a próxima alteração com o ciclo de renderização
  setTimeout(() => {
    requestAnimationFrame(() => {
      // Reaplica a transição
      requestAnimationFrame(() => {
        rateSection.style.transition =
          "transform 0.3s cubic-bezier(0, 0.6, 0, 1.02) 0s"; // Reaplica transição
        rateSection.style.transform = "scale(1)"; // Define o scale para 1 com animação
        // Inicia a animação do valor
        animateValue(startValue, endValue, 1000); // 1000 milliseconds = 1 segundo
      });
    });
  }, 400); // Delay de 100 milissegundos
};

// Adiciona event listeners aos botões like e not-like para chamar a função ao serem clicados
likeBtn.addEventListener("click", animateScale);
notlikeBtn.addEventListener("click", animateScale);

//
//
// TROCA DE CLASSES DOS BOTÕES LIKE E NOTLIKE
const toggleStepClasses = () => {
  // Função para atualizar o saldo suavemente
  const updateBalanceValue = () => {
    const balanceSpan = document.querySelector(".balance span");
    if (balanceSpan) {
      // Valor atual do saldo
      let currentValue = parseFloat(balanceSpan.textContent);
      // Calcula o valor necessário para atingir ou se aproximar de 69.27
      let targetValue = 69.27 - currentValue;
      // Limita o valor adicionado entre 8 e 10
      let valueAdded = Math.min(Math.random() * 2 + 8, targetValue);
      // Calcula o novo saldo
      let newBalance = currentValue + valueAdded;
      // Atualiza o texto do saldo na interface
      balanceSpan.textContent = newBalance.toFixed(2);

      // Retorna o valor adicionado para exibir na notificação
      return valueAdded;
    }
  };

  // Adiciona +8 ao valor do balance quando os botões likeBtn ou notlikeBtn forem clicados
  let valueAdded = updateBalanceValue();

  // Verifica se o botão like possui a classe step3
  if (likeBtn.classList.contains("step3")) {
    saleSound.play();
    // Não faz nada se a classe step3 já existir
  } else if (likeBtn.classList.contains("step2")) {
    document.body.style.transition = "background-color 1s ease";
    saleSound.play();

    setTimeout(() => {
      document.body.style.background =
        "linear-gradient(to bottom, rgb(100, 100, 100), rgb(0, 0, 0))";
    }, 300);

    likeBtn.classList.remove("step2"); // Remove a classe step2
    likeBtn.classList.add("step3"); // Adiciona a classe step3
  } else {
    saleSound.play();
    likeBtn.classList.add("step2"); // Adiciona a classe step2

    document.body.style.transition = "background-color 1s ease";

    setTimeout(() => {
      document.body.style.background =
        "linear-gradient(to bottom, rgb(242, 86, 66), rgb(0, 0, 0))";
    }, 400);
  }

  // Verifica se o botão not-like possui a classe step3
  if (notlikeBtn.classList.contains("step3")) {
    // Não faz nada se a classe step3 já existir
  } else if (notlikeBtn.classList.contains("step2")) {
    notlikeBtn.classList.remove("step2"); // Remove a classe step2
    notlikeBtn.classList.add("step3"); // Adiciona a classe step3
  } else {
    notlikeBtn.classList.add("step2"); // Adiciona a classe step2
  }

  // Exibe a notificação com o valor adicionado ao saldo
  showNotification(
    `Thank you for participating! You won $${valueAdded.toFixed(2)}!`
  );
};

// Adiciona um event listener aos botões like e not-like para chamar a função ao serem clicados
likeBtn.addEventListener("click", toggleStepClasses);
notlikeBtn.addEventListener("click", toggleStepClasses);

//
//
// BTN VSL FUNCTION
document.addEventListener("DOMContentLoaded", function () {
  const btnVsl = document.querySelector(".btn-vsl");

  if (btnVsl) {
    btnVsl.addEventListener("click", function () {
      const content = document.querySelector(".content");
      const contentVsl = document.querySelector(".content-vsl");
      const vslC = document.querySelector(".vsl-c");

      if (content) {
        const popup2 = document.querySelector(".popup2");
        if (popup2) {
          popup2.style.display = "none";
        }

        content.classList.add("d-none");

        const popups = document.querySelector(".popups");
        if (popups) {
          popups.classList.add("opacity-0");
          popups.style.display = "none";
        }

        document.body.style.background =
          "linear-gradient(to bottom, rgb(0, 0, 0), rgb(0, 0, 0))";

        const topElement = document.querySelector(".top");
        if (topElement) {
          topElement.style.marginBottom = "25px";
        }

        if (contentVsl) {
          contentVsl.style.display = "flex";

          setTimeout(() => {
            vslC.style.transition = "transform 0.4s ease-in-out";
            vslC.style.transform = "translateX(0)";
          }, 0);
        }

        if (headline) {
          setTimeout(() => {
            headline.classList.remove("opacity-0");
          }, 50);
        }
      }
    });
  }
});
