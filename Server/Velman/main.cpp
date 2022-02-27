#include <QtCore/QCoreApplication>
#include <QSettings>
#include "velman.h"

int main(int argc, char *argv[])
{
	QCoreApplication a(argc, argv);
	
	QSettings *settings = new QSettings("config.ini", QSettings::IniFormat);

	QStringList list = settings->allKeys();

	if (!settings->contains("WS/port"))
	{
		settings->beginGroup("WS");
		settings->setValue("port", "3002");
		settings->endGroup();
		settings->sync();
	}

	int port = settings->value("WS/port", "config").toInt();

	new velman(port);

	return a.exec();
}
