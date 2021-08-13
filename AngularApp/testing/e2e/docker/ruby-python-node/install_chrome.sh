#!/bin/bash
set -eo pipefail
if [[ $EUID == 0 ]]; then export SUDO=""; else export SUDO="sudo"; fi

CHROME_VERSION=latest
# installation check
if uname -a | grep Darwin > /dev/null 2>&1; then
  if ls /Applications | grep "Google Chrome" > /dev/null 2>&1; then

    echo "$(/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version)is already installed"

    exit 0
  else
    echo "Google Chrome is not currently installed; installing it"
  fi
elif cat /etc/issue | grep Alpine > /dev/null 2>&1; then
  if command -v chromium-browser > /dev/null 2>&1; then

    echo "$(chromium-browser --version)is already installed to $(which chromium-browser)"

    exit 0

  else
    echo "Google Chrome (via Chromium) is not currently installed; installing it"
  fi
elif command -v yum > /dev/null 2>&1; then
  if command -v google-chrome > /dev/null 2>&1; then
    echo "$(google-chrome --version)is already installed to $(which google-chrome)"

    exit 0
  else
    echo "Google Chrome is not currently installed; installing it"
  fi
else
  if command -v google-chrome > /dev/null 2>&1; then

    echo "$(google-chrome --version)is already installed to $(which google-chrome)"

    exit 0
  else
    echo "Google Chrome is not currently installed; installing it"
  fi
fi

# install chrome
if uname -a | grep Darwin > /dev/null 2>&1; then
  brew update > /dev/null 2>&1 && \
    HOMEBREW_NO_AUTO_UPDATE=1 brew install google-chrome > /dev/null 2>&1

  echo -e "#\!/bin/bash\n" > google-chrome
  perl -i -pe "s|#\\\|#|g" google-chrome
  echo -e "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \"\$@\"" >> google-chrome

  $SUDO mv google-chrome /usr/local/bin
  $SUDO chmod +x /usr/local/bin/google-chrome

  # test/verify installation
  if google-chrome --version > /dev/null 2>&1; then
    echo "$(google-chrome --version)has been installed in the /Applications directory"
    echo "A shortcut has also been created at $(which google-chrome)"
    exit 0
  else
    echo "Something went wrong; Google Chrome could not be installed"
    exit 1
  fi
elif command -v yum > /dev/null 2>&1; then
  # download chrome
  if [[ "$CHROME_VERSION" == "latest" ]]; then
    CHROME_URL="https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm"
  else
    CHROME_URL="https://dl.google.com/linux/chrome/rpm/stable/x86_64/google-chrome-stable-$CHROME_VERSION-1.x86_64.rpm"
  fi

  curl --silent --show-error --location --fail --retry 3 \
    --output google-chrome.rpm \
    $CHROME_URL
  curl --silent --show-error --location --fail --retry 3 \
    --output liberation-fonts.rpm \
    http://mirror.centos.org/centos/7/os/x86_64/Packages/liberation-fonts-1.07.2-16.el7.noarch.rpm

  $SUDO yum localinstall -y liberation-fonts.rpm \
    > /dev/null 2>&1

  $SUDO yum localinstall -y google-chrome.rpm \
    > /dev/null 2>&1

  rm -rf google-chrome.rpm liberation-fonts.rpm
else
  # download chrome
  if [[ "$CHROME_VERSION" == "latest" ]]; then
    CHROME_URL="https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"
  else
    CHROME_URL="https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb"
  fi
  curl --silent --show-error --location --fail --retry 3 \
    --output google-chrome.deb $CHROME_URL

  $SUDO apt-get update
  # The pipe will install any dependencies missing
  $SUDO dpkg -i google-chrome.deb || $SUDO apt-get -fy install
  rm -rf google-chrome.deb
  $SUDO sed -i 's|HERE/chrome"|HERE/chrome" --disable-setuid-sandbox --no-sandbox|g' "/opt/google/chrome/google-chrome"
fi

# test/verify installation
if [[ "$CHROME_VERSION" != "latest" ]]; then
  if google-chrome --version | grep "$CHROME_VERSION" > /dev/null 2>&1; then
    :
  else
    echo "Something went wrong; Google Chrome could not be installed"
    exit 1
  fi
else
  if google-chrome --version  > /dev/null 2>&1; then
    :
  else
    echo "Something went wrong; Google Chrome could not be installed"
    exit 1
  fi
  echo "$(google-chrome --version) has been installed to $(which google-chrome)"
  echo "Chrome: $CHROME_VERSION" >> ${HOME}/.browser-versions
fi
