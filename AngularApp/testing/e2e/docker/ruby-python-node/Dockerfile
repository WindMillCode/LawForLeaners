FROM molinav/ubuntu-pyenv:latest

# node
RUN apt-get -y update && DEBIAN_FRONTEND=noninteractive \
    apt-get  -y install  curl gnupg2 git ssh tar gzip ca-certificates lsb-release \
    # python
    g++ gcc autoconf automake bison libc6-dev libffi-dev \
    libgdbm-dev libncurses5-dev libsqlite3-dev libtool libyaml-dev \
    make pkg-config sqlite3 zlib1g-dev libgmp-dev libreadline-dev libssl-dev \
    # ruby
    wget software-properties-common \
    #circle ci additions \
    unzip jq \
    # e2e additions
    xorg xauth openbox sudo \
    # dev additions
    mlocate vim dos2unix
ENV NVM_DIR="/root/.nvm"
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.38.0/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install lts/fermium && \
	nvm use lts/fermium && \
    npm i -g npm && \
	node -v && npm -v



# ruby
RUN git clone https://github.com/sstephenson/rbenv.git /usr/local/rbenv
RUN echo '# rbenv setup' > /etc/profile.d/01-rbenv.sh
RUN echo 'export RBENV_ROOT=/usr/local/rbenv' >> /etc/profile.d/01-rbenv.sh
RUN echo 'export PATH="$RBENV_ROOT/bin:$PATH"' >> /etc/profile.d/01-rbenv.sh
RUN echo 'eval "$(rbenv init -)"' >> /etc/profile.d/01-rbenv.sh
RUN chmod +x /etc/profile.d/01-rbenv.sh


# install ruby-build
RUN mkdir /usr/local/rbenv/plugins

RUN git clone https://github.com/sstephenson/ruby-build.git /usr/local/rbenv/plugins/ruby-build

ENV RBENV_ROOT /usr/local/rbenv

ENV PATH "$HOME/.nvm:$RBENV_ROOT/bin:$RBENV_ROOT/shims:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

RUN rbenv install 3.0.0
RUN rbenv rehash
RUN rbenv global 3.0.0

# # nvm
# RUN echo '# nvm setup' >> /etc/profile.d/nvm.sh
# RUN echo 'export NVM_DIR=$HOME/.nvm' >> /etc/profile.d/nvm.sh
# RUN echo '[ -s "$NVM_DIR/nvm.sh" ]' >> /etc/profile.d/nvm.sh
# RUN echo '. $NVM_DIR/nvm.sh' >> /etc/profile.d/nvm.sh


# Give gui access for e2e
RUN groupadd -g 1000 ubuntu && useradd -d /home/ubuntu -s /bin/bash \
    -m ubuntu -u 1000 -g 1000
RUN exec $SHELL




COPY Gemfile /home/ubuntu/
COPY linux-requirements.txt /requirements.txt
COPY package.json /
COPY 01-custom-docker-setup.sh /etc/profile.d/01-custom-docker-setup.sh
RUN chmod +x /etc/profile.d/01-custom-docker-setup.sh
RUN chmod +x /etc/profile.d/01-set-pyenv.sh




RUN chmod 777 /home/ubuntu/Gemfile; chown ubuntu:ubuntu /home/ubuntu/Gemfile; \
    chmod 777 requirements.txt; chown ubuntu:ubuntu requirements.txt; \
    chmod 777 package.json; chown ubuntu:ubuntu package.json; \
    chmod -R 777 /usr/local/rbenv; \
    chmod -R 777 /root/.nvm;



USER ubuntu
WORKDIR /home/ubuntu

RUN bundle install

USER root
WORKDIR /

RUN . /etc/profile; \
    sudo su ubuntu; whoami;\
    python3.9 -m pip install --upgrade pip; \
    pip install -r requirements.txt --upgrade

RUN echo "ubuntu ALL=(ALL:ALL) ALL" >> /etc/sudoers.d/ubuntu
RUN    [ -s "$NVM_DIR/nvm.sh" ]  ; \
  . "$NVM_DIR/nvm.sh"  ; \
npm install
RUN chmod 777 /node_modules ; chmod 777 /usr/local/share/pyenv


USER root
WORKDIR /
# install chrome & firefox
COPY install_firefox.sh ./
COPY install_chrome.sh ./
COPY install_chromedriver.sh ./
COPY install_geckodriver.sh ./

RUN chmod 777 install_firefox.sh;   ./install_firefox.sh;\
    chmod 777 install_chrome.sh;  ./install_chrome.sh; \
    chmod 777 install_chromedriver.sh;  ./install_chromedriver.sh; \
    chmod 777 install_geckodriver.sh;  ./install_geckodriver.sh;


# delete some files
RUN rm install_firefox.sh install_chrome.sh install_chromedriver.sh install_geckodriver.sh



