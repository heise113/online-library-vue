<script setup>
import http from "@/utils/http";
import {ref, onMounted, onBeforeUpdate, watch, onUnmounted, onUpdated} from "vue";
import {useStore} from "@/store/store.js";
import {useRoute} from "vue-router";
const store = useStore()

window.addEventListener("resize", onResize)

let book_id_name = useRoute().params.book_name
let book = ref("")
let current_position_px = 0;
let current_position_page = ref(1);
let past_position_percent = ref(0);
let current_count_page = ref(0)


onMounted(() => {
  findCurrentPosition(getPositionPercent())
})

onUpdated(() => {
  findCurrentPosition(getPositionPercent())
  // updateProgressLine(getPositionPercent())
})

http.getBook(book_id_name)
    .then((resp) => {
      book.value = resp.data.book_content
    })
    .catch(error => console.log(error.message))

    



function findCurrentPosition(percent) {
  let content = document.getElementById("r-content");
  current_position_page.value = Math.round((percent * getCountPage()) / 100);
  if (current_position_page.value <= 0)
    ++current_position_page.value
  else if (current_position_page.value > getCountPage())
    --current_position_page.value
  if (window.innerWidth > 1024) {
    content.style.columnWidth = `${content.clientWidth / 2 - 50}px`;
    current_position_px = current_position_page.value * (content.clientWidth + 50) - (content.clientWidth + 50);
    content.style.right = `${current_position_px}px`;
  } else {
    content.style.columnWidth = `${content.clientWidth}px`;
    current_position_px = current_position_page.value * (content.clientWidth + 50) - (content.clientWidth + 50);
    content.style.right = `${current_position_px}px`;
  }
}

function onResize() {
  findCurrentPosition(past_position_percent.value)
  updateProgressLine(getPositionPercent())
}

function getPositionPercent() {
  return (current_position_page.value * 100) / getCountPage();
}

function getCountPage() {
  let content = document.getElementById("r-content")
  let client_width = content.clientWidth
  let scroll_width = content.scrollWidth
  let count_page = 0
  while (scroll_width > 0) {
    count_page++
    scroll_width -= client_width
    if (scroll_width <= 0) break
    scroll_width -= 50
  }
  current_count_page.value = count_page;
  return count_page
}

function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);

  if (isMobile) {
    return "mobile";
  } else {
    return "desktop";
  }
}

function moveRightContent() {
  console.log(current_position_page.value)
  let content = document.getElementById("r-content")
  current_position_page.value++
  current_position_px += content.clientWidth + 50
  content.style.right = `${current_position_px}px`
  past_position_percent.value = getPositionPercent()
  updateProgressLine(getPositionPercent())
}

function moveLeftContent() {
  let content = document.getElementById("r-content")
  current_position_page.value--
  current_position_px -= content.clientWidth + 50
  content.style.right = `${current_position_px}px`
  past_position_percent.value = getPositionPercent()
  updateProgressLine(getPositionPercent())
}


function moveNavCircle(event) {
  let nav_line = document.getElementById("nav-line")
  let nav_circle = event.target
  let nav_line_read = document.getElementById("nav-line-read")
  let shiftX = 0
  getDeviceType() === "desktop"
      ? shiftX = event.clientX - nav_circle.getBoundingClientRect().left
      : shiftX = event.touches[0].pageX - nav_circle.getBoundingClientRect().left
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('touchmove', onMouseMove);
  document.addEventListener('touchend', onMouseUp);

  function onMouseMove(event) {
    let newLeft = 0
    getDeviceType() === "desktop"
        ? newLeft = event.clientX - shiftX - nav_line.getBoundingClientRect().left
        : newLeft = event.touches[0].pageX - shiftX - nav_line.getBoundingClientRect().left;
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = nav_line.offsetWidth - nav_circle.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    nav_circle.style.left = newLeft + 'px';
    past_position_percent.value = newLeft * 100 / (nav_line.clientWidth - nav_circle.clientWidth)
    nav_line_read.style.width = `${past_position_percent.value}%`
    findCurrentPosition(past_position_percent.value)
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchmove', onMouseMove);
    document.removeEventListener('touchend', onMouseUp);
  }
}

function updateProgressLine(percent) {
  let nav_line = document.getElementById("nav-line")
  let nav_circle = document.getElementById("nav-circle")
  let nav_line_read = document.getElementById("nav-line-read")
  if (current_position_page.value === 1) {
    nav_circle.style.left = "0"
    nav_line_read.style.width = `0%`
  } else if (current_position_page.value === current_count_page.value) {
    nav_circle.style.left = `${nav_line.clientWidth - nav_circle.clientWidth}px`
    nav_line_read.style.width = `100%`
  } else {
    nav_circle.style.left = `${(nav_line.clientWidth - nav_circle.clientWidth) * percent / 100}px`
    nav_line_read.style.width = `${percent}%`
  }
}
</script>


<template>
  <div class="wrapper-reader" :class="{'wrapper-reader-dark': store.theme === 'dark'}">
    <button
        :disabled="current_position_page <= 1"
        @click="moveLeftContent"
        class="wrapper-reader__prev-button"
    ></button>
    <div id="r-screen" class="wrapper-reader__screen">
      <div 
        v-html="book" 
        id="r-content" 
        class="wrapper-reader__content"
        :class="{'wrapper-reader__content-dark': store.theme === 'dark'}"
      ></div>
<!--            <div id="r-content" class="wrapper-reader__content" @click="console.log('fsdfsd')">-->
<!--              Lorem ipsum dolor sit amet, consectetur adipisicing elit.  voluptas! Accusantium aspernatur atque autem consequuntur delectus dolorem dolores doloribus eaque, enim fuga illum iusto laboriosam libero molestiae nemo nostrum officiis optio quaerat qui quidem quis quod repellat sapiente veritatis voluptate? Autem cum distinctio doloribus, earum eum fuga fugit ipsa minus nesciunt perferendis qui, quibusdam quisquam ratione reiciendis tempore tenetur vel vero voluptas! Aliquid aperiam architecto atque aut corporis cum dolor dolore doloremque error illum, inventore itaque libero molestias nihil nostrum omnis ratione rerum tempore totam voluptatum. Explicabo magni officiis similique. Adipisci aliquam amet aperiam architecto aspernatur aut commodi consectetur consequatur dignissimos dolore dolorem doloremque eligendi error eveniet ex expedita explicabo facere inventore minima modi natus necessitatibus nostrum obcaecati odio odit perspiciatis praesentium quae quam qui quisquam quo repellat, saepe sapiente ut vel velit veritatis. Aliquam consectetur eveniet illum modi, molestiae necessitatibus non similique! Accusantium adipisci, at atque, beatae dicta eaque eius exercitationem facere fuga fugit iure laboriosam necessitatibus nobis numquam omnis, quae quia quo rem reprehenderit sed similique sint vel voluptatem! Beatae corporis exercitationem fugit in molestias quam saepe velit? Cum earum expedita nobis odit porro quo voluptatibus! Ab commodi dolorem fuga molestias officiis pariatur reiciendis! Adipisci commodi dolores eaque excepturi fuga obcaecati sit suscipit. Alias aliquam atque culpa dolore doloremque ducimus eius et ex fugiat harum id impedit iste neque, omnis provident qui quia quo repellendus tempora tempore? Blanditiis hic laudantium molestiae ullam voluptates! Alias architecto asperiores aut ea facere facilis impedit iste magni nostrum odit, quod reprehenderit temporibus voluptate? Accusamus amet aperiam at atque aut consectetur consequatur delectus ducimus eum eveniet id illo illum itaque molestias mollitia neque, nesciunt, nihil numquam obcaecati odit possimus quae quibusdam quidem quo reiciendis soluta sunt unde, vel veniam voluptatem? A ab accusantium animi assumenda culpa cupiditate dignissimos dolor dolorum ducimus earum error fuga fugiat, ipsum iste, minus nemo non, nulla numquam odio praesentium provident quae rerum vitae voluptatibus voluptatum. Adipisci assumenda beatae consectetur dignissimos doloribus ea earum est, ex laudantium magni, mollitia natus nobis pariatur perspiciatis, ratione sapiente vitae voluptatem! Amet aspernatur at beatae blanditiis culpa deserunt doloremque ducimus, ea enim esse est expedita, facere facilis fuga impedit iusto laboriosam molestias mollitia natus odit officiis pariatur quidem quo quod sit suscipit temporibus totam vitae voluptatem voluptates. Ab consequuntur distinctio doloremque ipsam, ipsum nihil non unde veritatis. Autem corporis dolorum inventore iure maiores numquam praesentium repellat veniam, vero. Commodi consequatur corporis dolorem doloremque eaque eligendi error et eum harum id in laborum natus officiis, quis reiciendis soluta tenetur veniam. A consectetur cumque ducimus nostrum, numquam obcaecati quisquam vero? Commodi eius eligendi nam, necessitatibus nisi pariatur perferendis quam quas quis, quod temporibus ullam, unde. Accusantium beatae ex incidunt odit rerum sit tenetur vitae. Ad adipisci aperiam aspernatur doloribus ducimus eius, est eveniet, explicabo maiores molestiae, quis quod reiciendis sequi suscipit voluptas. Ad alias beatae dolore ducimus eum ex excepturi fuga impedit inventore modi natus nobis nulla obcaecati quia, ratione rem saepe sequi similique sunt tempore ullam velit, veritatis voluptates. Aliquid delectus ea earum eos, eum, illo in magni nobis officiis placeat quis ratione tempora, voluptate. Aperiam assumenda, cum debitis eius error, et impedit magni maiores modi mollitia provident tempore? Blanditiis commodi consectetur cum debitis deserunt doloremque exercitationem fuga, illo inventore, minima minus necessitatibus neque porro quam quis quos voluptate voluptates! Architecto, consequuntur est, excepturi impedit ipsa modi, molestiae mollitia nihil omnis quas quisquam quos voluptas. Culpa ex fugit harum repellat reprehenderit repudiandae vero! Aut commodi consequatur deserunt dolorem enim eveniet expedita laboriosam natus non numquam perspiciatis porro quam quia quisquam, recusandae rerum tempore. Atque commodi consequuntur, deserunt dolores incidunt minus, molestiae non nostrum quia sit sunt, tempore vero. Aliquid excepturi maiores neque nulla praesentium quam quas, quia quibusdam similique sunt? Atque cum doloremque doloribus maiores officia officiis porro sapiente sequi sit voluptate! Adipisci et incidunt molestias obcaecati officia ratione, sequi voluptas! Aspernatur at cumque deleniti et harum officia praesentium rem repudiandae ut voluptatum? At atque cupiditate debitis dignissimos dolor dolorum ea esse explicabo fugit id inventore ipsam itaque iure labore laborum magnam maiores minima, minus modi molestias natus odit quae quod repellendus rerum saepe sequi, soluta suscipit temporibus vel. Expedita iusto magni, natus neque non ut? Cum eveniet explicabo ipsam iste modi necessitatibus officiis quia sequi sint voluptatem? Aperiam aspernatur atque, commodi doloribus ducimus esse explicabo facere harum id illum impedit incidunt ipsum itaque neque nobis numquam odit officia pariatur porro possimus quas quidem suscipit ullam, ut vero voluptas voluptate voluptatum! Ab, eaque error harum illum mollitia nam nostrum, placeat rem repellendus similique ullam, vero voluptas? Aliquam aspernatur blanditiis culpa fugit harum mollitia nisi ut. At, aut consequatur deserunt esse eveniet harum, impedit laboriosam molestiae nam non ratione sed! Accusantium animi inventore labore quaerat. Assumenda deleniti dolores ea eaque eveniet excepturi, fugiat laudantium modi nisi quas quos repellendus sint voluptate? Ad, aliquid, soluta! Accusamus est impedit iste laborum odit quia rerum. Assumenda, cum est eveniet expedita fuga ipsa laborum officiis sequi. Accusamus aliquam aliquid aperiam architecto culpa delectus ea inventore iste laboriosam libero magni modi mollitia nam, obcaecati officia officiis perferendis similique voluptatibus. Ab adipisci alias aspernatur consectetur consequuntur dignissimos distinctio error est et explicabo facere facilis ipsum iusto, laudantium molestiae mollitia nam nemo neque odit pariatur praesentium quas qui quis quisquam ratione, reprehenderit sint soluta tenetur veritatis vero. Aut consectetur debitis ducimus expedita impedit, ipsam iusto nemo porro quas tempore voluptate voluptatum! Aliquid amet facere impedit ipsum iste laudantium odit perspiciatis recusandae vero, vitae? Ab adipisci aliquam amet animi at cum cupiditate dicta distinctio eius eos eum eveniet fugiat fugit harum hic, illum iusto labore laudantium magnam maiores mollitia necessitatibus neque nisi nulla pariatur perferendis placeat quis quo repellendus repudiandae sed sint suscipit tenetur ullam vero voluptate voluptates? Consectetur deserunt ex id ipsa modi mollitia placeat tempora veniam vero? At consequuntur culpa deserunt, dicta dolor doloremque earum error esse excepturi odio optio perferendis qui reiciendis vel voluptates! Amet doloremque eum ex exercitationem harum libero temporibus voluptatem!-->
<!--              Lorem ipsum dolor sit amet, consectetur adipisicing elit.  voluptas! Accusantium aspernatur atque autem consequuntur delectus dolorem dolores doloribus eaque, enim fuga illum iusto laboriosam libero molestiae nemo nostrum officiis optio quaerat qui quidem quis quod repellat sapiente veritatis voluptate? Autem cum distinctio doloribus, earum eum fuga fugit ipsa minus nesciunt perferendis qui, quibusdam quisquam ratione reiciendis tempore tenetur vel vero voluptas! Aliquid aperiam architecto atque aut corporis cum dolor dolore doloremque error illum, inventore itaque libero molestias nihil nostrum omnis ratione rerum tempore totam voluptatum. Explicabo magni officiis similique. Adipisci aliquam amet aperiam architecto aspernatur aut commodi consectetur consequatur dignissimos dolore dolorem doloremque eligendi error eveniet ex expedita explicabo facere inventore minima modi natus necessitatibus nostrum obcaecati odio odit perspiciatis praesentium quae quam qui quisquam quo repellat, saepe sapiente ut vel velit veritatis. Aliquam consectetur eveniet illum modi, molestiae necessitatibus non similique! Accusantium adipisci, at atque, beatae dicta eaque eius exercitationem facere fuga fugit iure laboriosam necessitatibus nobis numquam omnis, quae quia quo rem reprehenderit sed similique sint vel voluptatem! Beatae corporis exercitationem fugit in molestias quam saepe velit? Cum earum expedita nobis odit porro quo voluptatibus! Ab commodi dolorem fuga molestias officiis pariatur reiciendis! Adipisci commodi dolores eaque excepturi fuga obcaecati sit suscipit. Alias aliquam atque culpa dolore doloremque ducimus eius et ex fugiat harum id impedit iste neque, omnis provident qui quia quo repellendus tempora tempore? Blanditiis hic laudantium molestiae ullam voluptates! Alias architecto asperiores aut ea facere facilis impedit iste magni nostrum odit, quod reprehenderit temporibus voluptate? Accusamus amet aperiam at atque aut consectetur consequatur delectus ducimus eum eveniet id illo illum itaque molestias mollitia neque, nesciunt, nihil numquam obcaecati odit possimus quae quibusdam quidem quo reiciendis soluta sunt unde, vel veniam voluptatem? A ab accusantium animi assumenda culpa cupiditate dignissimos dolor dolorum ducimus earum error fuga fugiat, ipsum iste, minus nemo non, nulla numquam odio praesentium provident quae rerum vitae voluptatibus voluptatum. Adipisci assumenda beatae consectetur dignissimos doloribus ea earum est, ex laudantium magni, mollitia natus nobis pariatur perspiciatis, ratione sapiente vitae voluptatem! Amet aspernatur at beatae blanditiis culpa deserunt doloremque ducimus, ea enim esse est expedita, facere facilis fuga impedit iusto laboriosam molestias mollitia natus odit officiis pariatur quidem quo quod sit suscipit temporibus totam vitae voluptatem voluptates. Ab consequuntur distinctio doloremque ipsam, ipsum nihil non unde veritatis. Autem corporis dolorum inventore iure maiores numquam praesentium repellat veniam, vero. Commodi consequatur corporis dolorem doloremque eaque eligendi error et eum harum id in laborum natus officiis, quis reiciendis soluta tenetur veniam. A consectetur cumque ducimus nostrum, numquam obcaecati quisquam vero? Commodi eius eligendi nam, necessitatibus nisi pariatur perferendis quam quas quis, quod temporibus ullam, unde. Accusantium beatae ex incidunt odit rerum sit tenetur vitae. Ad adipisci aperiam aspernatur doloribus ducimus eius, est eveniet, explicabo maiores molestiae, quis quod reiciendis sequi suscipit voluptas. Ad alias beatae dolore ducimus eum ex excepturi fuga impedit inventore modi natus nobis nulla obcaecati quia, ratione rem saepe sequi similique sunt tempore ullam velit, veritatis voluptates. Aliquid delectus ea earum eos, eum, illo in magni nobis officiis placeat quis ratione tempora, voluptate. Aperiam assumenda, cum debitis eius error, et impedit magni maiores modi mollitia provident tempore? Blanditiis commodi consectetur cum debitis deserunt doloremque exercitationem fuga, illo inventore, minima minus necessitatibus neque porro quam quis quos voluptate voluptates! Architecto, consequuntur est, excepturi impedit ipsa modi, molestiae mollitia nihil omnis quas quisquam quos voluptas. Culpa ex fugit harum repellat reprehenderit repudiandae vero! Aut commodi consequatur deserunt dolorem enim eveniet expedita laboriosam natus non numquam perspiciatis porro quam quia quisquam, recusandae rerum tempore. Atque commodi consequuntur, deserunt dolores incidunt minus, molestiae non nostrum quia sit sunt, tempore vero. Aliquid excepturi maiores neque nulla praesentium quam quas, quia quibusdam similique sunt? Atque cum doloremque doloribus maiores officia officiis porro sapiente sequi sit voluptate! Adipisci et incidunt molestias obcaecati officia ratione, sequi voluptas! Aspernatur at cumque deleniti et harum officia praesentium rem repudiandae ut voluptatum? At atque cupiditate debitis dignissimos dolor dolorum ea esse explicabo fugit id inventore ipsam itaque iure labore laborum magnam maiores minima, minus modi molestias natus odit quae quod repellendus rerum saepe sequi, soluta suscipit temporibus vel. Expedita iusto magni, natus neque non ut? Cum eveniet explicabo ipsam iste modi necessitatibus officiis quia sequi sint voluptatem? Aperiam aspernatur atque, commodi doloribus ducimus esse explicabo facere harum id illum impedit incidunt ipsum itaque neque nobis numquam odit officia pariatur porro possimus quas quidem suscipit ullam, ut vero voluptas voluptate voluptatum! Ab, eaque error harum illum mollitia nam nostrum, placeat rem repellendus similique ullam, vero voluptas? Aliquam aspernatur blanditiis culpa fugit harum mollitia nisi ut. At, aut consequatur deserunt esse eveniet harum, impedit laboriosam molestiae nam non ratione sed! Accusantium animi inventore labore quaerat. Assumenda deleniti dolores ea eaque eveniet excepturi, fugiat laudantium modi nisi quas quos repellendus sint voluptate? Ad, aliquid, soluta! Accusamus est impedit iste laborum odit quia rerum. Assumenda, cum est eveniet expedita fuga ipsa laborum officiis sequi. Accusamus aliquam aliquid aperiam architecto culpa delectus ea inventore iste laboriosam libero magni modi mollitia nam, obcaecati officia officiis perferendis similique voluptatibus. Ab adipisci alias aspernatur consectetur consequuntur dignissimos distinctio error est et explicabo facere facilis ipsum iusto, laudantium molestiae mollitia nam nemo neque odit pariatur praesentium quas qui quis quisquam ratione, reprehenderit sint soluta tenetur veritatis vero. Aut consectetur debitis ducimus expedita impedit, ipsam iusto nemo porro quas tempore voluptate voluptatum! Aliquid amet facere impedit ipsum iste laudantium odit perspiciatis recusandae vero, vitae? Ab adipisci aliquam amet animi at cum cupiditate dicta distinctio eius eos eum eveniet fugiat fugit harum hic, illum iusto labore laudantium magnam maiores mollitia necessitatibus neque nisi nulla pariatur perferendis placeat quis quo repellendus repudiandae sed sint suscipit tenetur ullam vero voluptate voluptates? Consectetur deserunt ex id ipsa modi mollitia placeat tempora veniam vero? At consequuntur culpa deserunt, dicta dolor doloremque earum error esse excepturi odio optio perferendis qui reiciendis vel voluptates! Amet doloremque eum ex exercitationem harum libero temporibus voluptatem!-->
<!--              Lorem ipsum dolor sit amet, consectetur adipisicing elit.  voluptas! Accusantium aspernatur atque autem consequuntur delectus dolorem dolores doloribus eaque, enim fuga illum iusto laboriosam libero molestiae nemo nostrum officiis optio quaerat qui quidem quis quod repellat sapiente veritatis voluptate? Autem cum distinctio doloribus, earum eum fuga fugit ipsa minus nesciunt perferendis qui, quibusdam quisquam ratione reiciendis tempore tenetur vel vero voluptas! Aliquid aperiam architecto atque aut corporis cum dolor dolore doloremque error illum, inventore itaque libero molestias nihil nostrum omnis ratione rerum tempore totam voluptatum. Explicabo magni officiis similique. Adipisci aliquam amet aperiam architecto aspernatur aut commodi consectetur consequatur dignissimos dolore dolorem doloremque eligendi error eveniet ex expedita explicabo facere inventore minima modi natus necessitatibus nostrum obcaecati odio odit perspiciatis praesentium quae quam qui quisquam quo repellat, saepe sapiente ut vel velit veritatis. Aliquam consectetur eveniet illum modi, molestiae necessitatibus non similique! Accusantium adipisci, at atque, beatae dicta eaque eius exercitationem facere fuga fugit iure laboriosam necessitatibus nobis numquam omnis, quae quia quo rem reprehenderit sed similique sint vel voluptatem! Beatae corporis exercitationem fugit in molestias quam saepe velit? Cum earum expedita nobis odit porro quo voluptatibus! Ab commodi dolorem fuga molestias officiis pariatur reiciendis! Adipisci commodi dolores eaque excepturi fuga obcaecati sit suscipit. Alias aliquam atque culpa dolore doloremque ducimus eius et ex fugiat harum id impedit iste neque, omnis provident qui quia quo repellendus tempora tempore? Blanditiis hic laudantium molestiae ullam voluptates! Alias architecto asperiores aut ea facere facilis impedit iste magni nostrum odit, quod reprehenderit temporibus voluptate? Accusamus amet aperiam at atque aut consectetur consequatur delectus ducimus eum eveniet id illo illum itaque molestias mollitia neque, nesciunt, nihil numquam obcaecati odit possimus quae quibusdam quidem quo reiciendis soluta sunt unde, vel veniam voluptatem? A ab accusantium animi assumenda culpa cupiditate dignissimos dolor dolorum ducimus earum error fuga fugiat, ipsum iste, minus nemo non, nulla numquam odio praesentium provident quae rerum vitae voluptatibus voluptatum. Adipisci assumenda beatae consectetur dignissimos doloribus ea earum est, ex laudantium magni, mollitia natus nobis pariatur perspiciatis, ratione sapiente vitae voluptatem! Amet aspernatur at beatae blanditiis culpa deserunt doloremque ducimus, ea enim esse est expedita, facere facilis fuga impedit iusto laboriosam molestias mollitia natus odit officiis pariatur quidem quo quod sit suscipit temporibus totam vitae voluptatem voluptates. Ab consequuntur distinctio doloremque ipsam, ipsum nihil non unde veritatis. Autem corporis dolorum inventore iure maiores numquam praesentium repellat veniam, vero. Commodi consequatur corporis dolorem doloremque eaque eligendi error et eum harum id in laborum natus officiis, quis reiciendis soluta tenetur veniam. A consectetur cumque ducimus nostrum, numquam obcaecati quisquam vero? Commodi eius eligendi nam, necessitatibus nisi pariatur perferendis quam quas quis, quod temporibus ullam, unde. Accusantium beatae ex incidunt odit rerum sit tenetur vitae. Ad adipisci aperiam aspernatur doloribus ducimus eius, est eveniet, explicabo maiores molestiae, quis quod reiciendis sequi suscipit voluptas. Ad alias beatae dolore ducimus eum ex excepturi fuga impedit inventore modi natus nobis nulla obcaecati quia, ratione rem saepe sequi similique sunt tempore ullam velit, veritatis voluptates. Aliquid delectus ea earum eos, eum, illo in magni nobis officiis placeat quis ratione tempora, voluptate. Aperiam assumenda, cum debitis eius error, et impedit magni maiores modi mollitia provident tempore? Blanditiis commodi consectetur cum debitis deserunt doloremque exercitationem fuga, illo inventore, minima minus necessitatibus neque porro quam quis quos voluptate voluptates! Architecto, consequuntur est, excepturi impedit ipsa modi, molestiae mollitia nihil omnis quas quisquam quos voluptas. Culpa ex fugit harum repellat reprehenderit repudiandae vero! Aut commodi consequatur deserunt dolorem enim eveniet expedita laboriosam natus non numquam perspiciatis porro quam quia quisquam, recusandae rerum tempore. Atque commodi consequuntur, deserunt dolores incidunt minus, molestiae non nostrum quia sit sunt, tempore vero. Aliquid excepturi maiores neque nulla praesentium quam quas, quia quibusdam similique sunt? Atque cum doloremque doloribus maiores officia officiis porro sapiente sequi sit voluptate! Adipisci et incidunt molestias obcaecati officia ratione, sequi voluptas! Aspernatur at cumque deleniti et harum officia praesentium rem repudiandae ut voluptatum? At atque cupiditate debitis dignissimos dolor dolorum ea esse explicabo fugit id inventore ipsam itaque iure labore laborum magnam maiores minima, minus modi molestias natus odit quae quod repellendus rerum saepe sequi, soluta suscipit temporibus vel. Expedita iusto magni, natus neque non ut? Cum eveniet explicabo ipsam iste modi necessitatibus officiis quia sequi sint voluptatem? Aperiam aspernatur atque, commodi doloribus ducimus esse explicabo facere harum id illum impedit incidunt ipsum itaque neque nobis numquam odit officia pariatur porro possimus quas quidem suscipit ullam, ut vero voluptas voluptate voluptatum! Ab, eaque error harum illum mollitia nam nostrum, placeat rem repellendus similique ullam, vero voluptas? Aliquam aspernatur blanditiis culpa fugit harum mollitia nisi ut. At, aut consequatur deserunt esse eveniet harum, impedit laboriosam molestiae nam non ratione sed! Accusantium animi inventore labore quaerat. Assumenda deleniti dolores ea eaque eveniet excepturi, fugiat laudantium modi nisi quas quos repellendus sint voluptate? Ad, aliquid, soluta! Accusamus est impedit iste laborum odit quia rerum. Assumenda, cum est eveniet expedita fuga ipsa laborum officiis sequi. Accusamus aliquam aliquid aperiam architecto culpa delectus ea inventore iste laboriosam libero magni modi mollitia nam, obcaecati officia officiis perferendis similique voluptatibus. Ab adipisci alias aspernatur consectetur consequuntur dignissimos distinctio error est et explicabo facere facilis ipsum iusto, laudantium molestiae mollitia nam nemo neque odit pariatur praesentium quas qui quis quisquam ratione, reprehenderit sint soluta tenetur veritatis vero. Aut consectetur debitis ducimus expedita impedit, ipsam iusto nemo porro quas tempore voluptate voluptatum! Aliquid amet facere impedit ipsum iste laudantium odit perspiciatis recusandae vero, vitae? Ab adipisci aliquam amet animi at cum cupiditate dicta distinctio eius eos eum eveniet fugiat fugit harum hic, illum iusto labore laudantium magnam maiores mollitia necessitatibus neque nisi nulla pariatur perferendis placeat quis quo repellendus repudiandae sed sint suscipit tenetur ullam vero voluptate voluptates? Consectetur deserunt ex id ipsa modi mollitia placeat tempora veniam vero? At consequuntur culpa deserunt, dicta dolor doloremque earum error esse excepturi odio optio perferendis qui reiciendis vel voluptates! Amet doloremque eum ex exercitationem harum libero temporibus voluptatem!-->
<!--              Lorem ipsum dolor sit amet, consectetur adipisicing elit.  voluptas! Accusantium aspernatur atque autem consequuntur delectus dolorem dolores doloribus eaque, enim fuga illum iusto laboriosam libero molestiae nemo nostrum officiis optio quaerat qui quidem quis quod repellat sapiente veritatis voluptate? Autem cum distinctio doloribus, earum eum fuga fugit ipsa minus nesciunt perferendis qui, quibusdam quisquam ratione reiciendis tempore tenetur vel vero voluptas! Aliquid aperiam architecto atque aut corporis cum dolor dolore doloremque error illum, inventore itaque libero molestias nihil nostrum omnis ratione rerum tempore totam voluptatum. Explicabo magni officiis similique. Adipisci aliquam amet aperiam architecto aspernatur aut commodi consectetur consequatur dignissimos dolore dolorem doloremque eligendi error eveniet ex expedita explicabo facere inventore minima modi natus necessitatibus nostrum obcaecati odio odit perspiciatis praesentium quae quam qui quisquam quo repellat, saepe sapiente ut vel velit veritatis. Aliquam consectetur eveniet illum modi, molestiae necessitatibus non similique! Accusantium adipisci, at atque, beatae dicta eaque eius exercitationem facere fuga fugit iure laboriosam necessitatibus nobis numquam omnis, quae quia quo rem reprehenderit sed similique sint vel voluptatem! Beatae corporis exercitationem fugit in molestias quam saepe velit? Cum earum expedita nobis odit porro quo voluptatibus! Ab commodi dolorem fuga molestias officiis pariatur reiciendis! Adipisci commodi dolores eaque excepturi fuga obcaecati sit suscipit. Alias aliquam atque culpa dolore doloremque ducimus eius et ex fugiat harum id impedit iste neque, omnis provident qui quia quo repellendus tempora tempore? Blanditiis hic laudantium molestiae ullam voluptates! Alias architecto asperiores aut ea facere facilis impedit iste magni nostrum odit, quod reprehenderit temporibus voluptate? Accusamus amet aperiam at atque aut consectetur consequatur delectus ducimus eum eveniet id illo illum itaque molestias mollitia neque, nesciunt, nihil numquam obcaecati odit possimus quae quibusdam quidem quo reiciendis soluta sunt unde, vel veniam voluptatem? A ab accusantium animi assumenda culpa cupiditate dignissimos dolor dolorum ducimus earum error fuga fugiat, ipsum iste, minus nemo non, nulla numquam odio praesentium provident quae rerum vitae voluptatibus voluptatum. Adipisci assumenda beatae consectetur dignissimos doloribus ea earum est, ex laudantium magni, mollitia natus nobis pariatur perspiciatis, ratione sapiente vitae voluptatem! Amet aspernatur at beatae blanditiis culpa deserunt doloremque ducimus, ea enim esse est expedita, facere facilis fuga impedit iusto laboriosam molestias mollitia natus odit officiis pariatur quidem quo quod sit suscipit temporibus totam vitae voluptatem voluptates. Ab consequuntur distinctio doloremque ipsam, ipsum nihil non unde veritatis. Autem corporis dolorum inventore iure maiores numquam praesentium repellat veniam, vero. Commodi consequatur corporis dolorem doloremque eaque eligendi error et eum harum id in laborum natus officiis, quis reiciendis soluta tenetur veniam. A consectetur cumque ducimus nostrum, numquam obcaecati quisquam vero? Commodi eius eligendi nam, necessitatibus nisi pariatur perferendis quam quas quis, quod temporibus ullam, unde. Accusantium beatae ex incidunt odit rerum sit tenetur vitae. Ad adipisci aperiam aspernatur doloribus ducimus eius, est eveniet, explicabo maiores molestiae, quis quod reiciendis sequi suscipit voluptas. Ad alias beatae dolore ducimus eum ex excepturi fuga impedit inventore modi natus nobis nulla obcaecati quia, ratione rem saepe sequi similique sunt tempore ullam velit, veritatis voluptates. Aliquid delectus ea earum eos, eum, illo in magni nobis officiis placeat quis ratione tempora, voluptate. Aperiam assumenda, cum debitis eius error, et impedit magni maiores modi mollitia provident tempore? Blanditiis commodi consectetur cum debitis deserunt doloremque exercitationem fuga, illo inventore, minima minus necessitatibus neque porro quam quis quos voluptate voluptates! Architecto, consequuntur est, excepturi impedit ipsa modi, molestiae mollitia nihil omnis quas quisquam quos voluptas. Culpa ex fugit harum repellat reprehenderit repudiandae vero! Aut commodi consequatur deserunt dolorem enim eveniet expedita laboriosam natus non numquam perspiciatis porro quam quia quisquam, recusandae rerum tempore. Atque commodi consequuntur, deserunt dolores incidunt minus, molestiae non nostrum quia sit sunt, tempore vero. Aliquid excepturi maiores neque nulla praesentium quam quas, quia quibusdam similique sunt? Atque cum doloremque doloribus maiores officia officiis porro sapiente sequi sit voluptate! Adipisci et incidunt molestias obcaecati officia ratione, sequi voluptas! Aspernatur at cumque deleniti et harum officia praesentium rem repudiandae ut voluptatum? At atque cupiditate debitis dignissimos dolor dolorum ea esse explicabo fugit id inventore ipsam itaque iure labore laborum magnam maiores minima, minus modi molestias natus odit quae quod repellendus rerum saepe sequi, soluta suscipit temporibus vel. Expedita iusto magni, natus neque non ut? Cum eveniet explicabo ipsam iste modi necessitatibus officiis quia sequi sint voluptatem? Aperiam aspernatur atque, commodi doloribus ducimus esse explicabo facere harum id illum impedit incidunt ipsum itaque neque nobis numquam odit officia pariatur porro possimus quas quidem suscipit ullam, ut vero voluptas voluptate voluptatum! Ab, eaque error harum illum mollitia nam nostrum, placeat rem repellendus similique ullam, vero voluptas? Aliquam aspernatur blanditiis culpa fugit harum mollitia nisi ut. At, aut consequatur deserunt esse eveniet harum, impedit laboriosam molestiae nam non ratione sed! Accusantium animi inventore labore quaerat. Assumenda deleniti dolores ea eaque eveniet excepturi, fugiat laudantium modi nisi quas quos repellendus sint voluptate? Ad, aliquid, soluta! Accusamus est impedit iste laborum odit quia rerum. Assumenda, cum est eveniet expedita fuga ipsa laborum officiis sequi. Accusamus aliquam aliquid aperiam architecto culpa delectus ea inventore iste laboriosam libero magni modi mollitia nam, obcaecati officia officiis perferendis similique voluptatibus. Ab adipisci alias aspernatur consectetur consequuntur dignissimos distinctio error est et explicabo facere facilis ipsum iusto, laudantium molestiae mollitia nam nemo neque odit pariatur praesentium quas qui quis quisquam ratione, reprehenderit sint soluta tenetur veritatis vero. Aut consectetur debitis ducimus expedita impedit, ipsam iusto nemo porro quas tempore voluptate voluptatum! Aliquid amet facere impedit ipsum iste laudantium odit perspiciatis recusandae vero, vitae? Ab adipisci aliquam amet animi at cum cupiditate dicta distinctio eius eos eum eveniet fugiat fugit harum hic, illum iusto labore laudantium magnam maiores mollitia necessitatibus neque nisi nulla pariatur perferendis placeat quis quo repellendus repudiandae sed sint suscipit tenetur ullam vero voluptate voluptates? Consectetur deserunt ex id ipsa modi mollitia placeat tempora veniam vero? At consequuntur culpa deserunt, dicta dolor doloremque earum error esse excepturi odio optio perferendis qui reiciendis vel voluptates! Amet doloremque eum ex exercitationem harum libero temporibus voluptatem!-->
<!--            </div>-->

    </div>
    <button
        :disabled="current_position_page >= current_count_page"
        @click="moveRightContent($event)"
        class="wrapper-reader__next-button"
    ></button>
    <div class="wrapper-reader__navigation">
      <div id="nav-line" class="wrapper-reader__nav-line" :class="{'wrapper-reader__nav-line-dark': store.theme === 'dark'}">
        <div class="wrapper-reader__percent" :class="{'wrapper-reader__percent-dark': store.theme === 'dark'}">
          {{ Math.round(past_position_percent) }}%
        </div>
        <div id="nav-line-read" class="wrapper-reader__nav-line-read"></div>
        <div id="nav-circle" @touchstart="moveNavCircle($event)" @mousedown="moveNavCircle($event)" class="wrapper-reader__nav-circle"></div>
      </div>
    </div>
  </div>
</template>


<style>
.b {
  text-indent: 20px;
}

h1 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

h2 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

<style scoped lang="scss">
.wrapper-reader {
  &__screen {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 80px;
    right: 80px;
    overflow: hidden;
  }

  &__content {
    position: relative;
    height: 100%;
    width: 100%;
    column-gap: 50px;
    font-size: 18px;
    line-height: 30px;
    touch-action: manipulation;

    &-dark {
      color: white;
    }
  }

  &__prev-button {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    width: 80px;
    user-select: none;
    touch-action: manipulation;

  }

  &__next-button {
    position: fixed;
    top: 100px;
    bottom: 100px;
    right: 0;
    width: 80px;
    user-select: none;
    touch-action: manipulation;
    
  }

  &__navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    padding-left: 80px;
    padding-right: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  &__percent {
    position: absolute;
    top: 15px;
    right: 10px;

    &-dark {
      color: white;
    }
  }

  &__nav-line {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 3px;
    width: 100%;
    background-color: rgba(black, 0.2);

    &-dark {
      background-color: rgba(white, 0.5);
    }
  }

  &__nav-line-read {
    position: absolute;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 3px;
    width: 0;
    //background-color: #a15208;
    background: linear-gradient(to right, red, blue);
  }

  &__nav-circle {
    position: relative;
    cursor: pointer;
    height: 30px;
    width: 10px;
    border-radius: 30px;
    //background-color: #a15208;
    background-color: blue;
  }
}

@media (max-width: 1024px) {
  .wrapper-reader {
    &__prev-button,
    &__next-button {
      width: 20px;
    }

    &__screen {
      top: 60px;
      bottom: 60px;
      left: 20px;
      right: 20px;
    }
  }
}
</style>
