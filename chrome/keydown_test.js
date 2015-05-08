/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Tests for keydown.js Included by keydown_test.html.
 * @author adhintz@google.com (Drew Hintz)
 */

function setUp() {
}

function testLetters() {
  var typed = new passwordalert.keydown.Typed();
  typed.event(65, false);    // a
  typed.event(65, true);     // A
  typed.event(0x31, false);  // 1
  assertEquals('aA1', typed.chars_);
  typed.event(8, false);     // Backspace.
  assertEquals('aA', typed.chars_);
}

function testCapslock() {
  var typed = new passwordalert.keydown.Typed();
  typed.event(90, false);  // z
  typed.event(20, false);  // caps lock.
  typed.event(90, false);  // z (caps locked to Z)
  typed.event(90, true);   // Z (caps locked to z)
  typed.event(20, false);  // caps lock.
  typed.event(90, false);  // z
  assertEquals('zZzz', typed.chars_);
}

function testSymbols() {
  var typed = new passwordalert.keydown.Typed();
  typed.event(189, false);  // -
  typed.event(189, true);   // _
  assertEquals('-_', typed.chars_);
}

function testCapsGuess() {
  var typed = new passwordalert.keydown.Typed();
  typed.event(65, false);  // a
  typed.keypress(65);      // A so triggers caps lock guessing.
  typed.event(65, false);  // a
  assertEquals('AA', typed.chars_);
}
