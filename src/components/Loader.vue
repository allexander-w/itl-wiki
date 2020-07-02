<template>
  <div class="loader-wrapper">
    <div class="loader">
      <div class="loadingio-spinner-rolling-n6j6f1htmo">
        <div class="ldio-poaljn2j05s">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.loader-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(#000000, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
@keyframes ldio-poaljn2j05s {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.ldio-poaljn2j05s div {
  position: absolute;
  width: 93.84px;
  height: 93.84px;
  border: 20.4px solid #0e65dd;
  border-top-color: transparent;
  border-radius: 50%;
}
.ldio-poaljn2j05s div {
  animation: ldio-poaljn2j05s 2.0833333333333335s linear infinite;
  top: 102px;
  left: 102px;
}
.loadingio-spinner-rolling-n6j6f1htmo {
  width: 204px;
  height: 204px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-poaljn2j05s {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-poaljn2j05s div {
  box-sizing: content-box;
}
</style>